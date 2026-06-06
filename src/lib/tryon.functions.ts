import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  human_image_url: z.string().min(1),
  garment_image_url: z.string().min(1),
  description: z.string().optional().default(""),
});

// Convert a remote image URL (or data URL) to a data URL so the model always
// receives inline image bytes.
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

export const runVirtualTryOn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY is not configured");

    const [humanDataUrl, garmentDataUrl] = await Promise.all([
      toDataUrl(data.human_image_url),
      toDataUrl(data.garment_image_url),
    ]);

    const prompt = `You are a virtual try-on assistant. The FIRST image is a person. The SECOND image is an outfit (${data.description || "clothing item"}) which may include a top, bottom (trousers/pants/skirt), or a full set. Generate a single photorealistic image of the SAME person wearing the EXACT outfit from the second image. If the garment image shows trousers/pants, replace the person's lower-body clothing with those trousers. If it shows a top, replace the upper-body clothing. If it shows a full outfit, replace both. Preserve the person's face, identity, hair, body proportions, pose, skin tone, lighting, and background exactly. Match the garment's color, pattern, texture, fit, and length precisely. Output: one image only.`;

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
              { type: "image_url", image_url: { url: humanDataUrl } },
              { type: "image_url", image_url: { url: garmentDataUrl } },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      if (res.status === 429) {
        return { success: false, error: "Rate limit hit. Please wait and try again." };
      }
      if (res.status === 402) {
        return { success: false, error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." };
      }
      return { success: false, error: `AI error ${res.status}: ${errText.slice(0, 200)}` };
    }

    const json: any = await res.json();
    const message = json?.choices?.[0]?.message;
    const imageUrl =
      message?.images?.[0]?.image_url?.url ||
      message?.images?.[0]?.url ||
      null;

    if (!imageUrl) {
      return { success: false, error: "No image returned from the AI." };
    }
    return { success: true, data: { image: { url: imageUrl } } };
  });
