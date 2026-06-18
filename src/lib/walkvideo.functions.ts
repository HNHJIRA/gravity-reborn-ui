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

const ANGLES = [
  {
    key: "front",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, standing naturally, photographed from the FRONT. Identical face, identical garment color/pattern/fit, identical background and lighting. Photorealistic.",
  },
  {
    key: "right",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the RIGHT SIDE PROFILE (90° rotation). Identical face, identical garment color/pattern/fit, identical background and lighting. Photorealistic.",
  },
  {
    key: "back",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from BEHIND (back view, 180° rotation). Show the back of the garment in detail. Identical hair, identical garment color/pattern/fit, identical background and lighting. Photorealistic.",
  },
  {
    key: "left",
    prompt:
      "Generate the SAME person wearing the SAME exact outfit, full body, photographed from the LEFT SIDE PROFILE (270° rotation). Identical face, identical garment color/pattern/fit, identical background and lighting. Photorealistic.",
  },
];

async function generateAngle(key: string, prompt: string, imageDataUrl: string) {
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
  if (!url) throw new Error("No image returned for angle");
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
      // Generate sequentially to avoid hitting rate limits
      for (const a of ANGLES) {
        try {
          const url = await generateAngle(key, a.prompt, dataUrl);
          frames.push(url);
        } catch (e: any) {
          const msg = String(e?.message || e);
          if (msg.includes("429")) {
            return { success: false, error: "Rate limit hit. Please wait a moment and try again." };
          }
          if (msg.includes("402")) {
            return { success: false, error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." };
          }
          console.error("angle failed", a.key, msg);
        }
      }

      if (frames.length === 0) {
        return { success: false, error: "Failed to generate any angle frames." };
      }

      return { success: true, frames };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err?.message || "Unknown error generating walkaround." };
    }
  });
