import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  image_url: z.string().min(1),
});

async function toDataUrl(src: string): Promise<string> {
  if (src.startsWith("data:")) return src;
  const res = await fetch(src);
  if (!res.ok) throw new Error(`Failed to fetch image: ${src}`);
  const contentType = res.headers.get("content-type") || "image/jpeg";
  const buf = new Uint8Array(await res.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  const b64 = btoa(bin);
  return `data:${contentType};base64,${b64}`;
}

// 8 frames simulating a person walking + camera orbiting around them.
// Sequence: front pose → walking forward → 3/4 right → right profile walking →
// 3/4 back → back walking away → 3/4 left → left profile pose → loops to front.
const FRAMES = [
  {
    key: "front-pose",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the FRONT, standing confidently with a slight model pose, one hand near hip. Identical face, identical garment color/pattern/fit, identical background and lighting. Cinematic fashion photography, photorealistic, sharp focus.",
  },
  {
    key: "front-walk",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the FRONT, mid-stride WALKING toward the camera, one leg forward, arms swinging naturally, hair with slight motion. Identical face, identical garment color/pattern/fit, identical background and lighting. Cinematic fashion runway, photorealistic, slight motion blur on limbs.",
  },
  {
    key: "three-quarter-right",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from a 3/4 FRONT-RIGHT angle (45°), mid-walk, body turning slightly right as the camera orbits around them. Identical face, identical garment, identical background and lighting. Cinematic, photorealistic.",
  },
  {
    key: "right-profile",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the RIGHT SIDE PROFILE (90°), walking, mid-stride, showing the side silhouette of the garment. Identical face, identical garment, identical background and lighting. Cinematic runway photography, photorealistic.",
  },
  {
    key: "three-quarter-back-right",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from a 3/4 BACK-RIGHT angle (135°), walking away from camera, showing the back-right of the garment. Identical hair, identical garment, identical background and lighting. Cinematic, photorealistic.",
  },
  {
    key: "back-walking",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from BEHIND (180°), WALKING AWAY from camera, mid-stride, showing the full back of the garment in detail. Identical hair, identical garment color/pattern/fit, identical background and lighting. Cinematic runway, photorealistic.",
  },
  {
    key: "three-quarter-back-left",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from a 3/4 BACK-LEFT angle (225°), walking, showing the back-left of the garment as the camera continues to orbit. Identical hair, identical garment, identical background and lighting. Cinematic, photorealistic.",
  },
  {
    key: "left-profile-pose",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the LEFT SIDE PROFILE (270°), pausing in a confident model pose, looking toward the camera. Identical face, identical garment color/pattern/fit, identical background and lighting. Cinematic editorial fashion, photorealistic.",
  },
];

async function generateFrame(key: string, prompt: string, imageDataUrl: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageDataUrl } },
          ],
        },
      ],
      modalities: ["image", "text"],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI error ${res.status}: ${errText.slice(0, 200)}`);
  }
  const json: any = await res.json();
  const message = json?.choices?.[0]?.message;
  const url =
    message?.images?.[0]?.image_url?.url ||
    message?.images?.[0]?.url ||
    null;
  if (!url) throw new Error("No image returned for frame");
  return url as string;
}

export const generateWalkVideo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { success: false, error: "LOVABLE_API_KEY is not configured." };
    }

    try {
      const dataUrl = await toDataUrl(data.image_url);

      const frames: string[] = [];
      const errors: string[] = [];
      for (const f of FRAMES) {
        try {
          const url = await generateFrame(key, f.prompt, dataUrl);
          frames.push(url);
        } catch (e: any) {
          const msg = String(e?.message || e);
          console.error("frame failed", f.key, msg);
          errors.push(`${f.key}: ${msg.slice(0, 200)}`);
          if (msg.includes("429")) {
            if (frames.length === 0) {
              return { success: false, error: "Rate limit hit (429). Please wait ~30s and try again." };
            }
            break;
          }
          if (msg.includes("402")) {
            return { success: false, error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." };
          }
        }
        await new Promise((r) => setTimeout(r, 300));
      }

      if (frames.length === 0) {
        return {
          success: false,
          error: `Failed to generate walkaround frames. First error → ${errors[0] || "unknown"}`,
        };
      }

      return { success: true, frames, partial: frames.length < FRAMES.length };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err?.message || "Unknown error generating walkaround." };
    }
  });
