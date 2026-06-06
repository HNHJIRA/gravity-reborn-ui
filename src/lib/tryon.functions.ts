import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  human_image_url: z.string().min(1),
  garment_image_url: z.string().min(1),
  description: z.string().optional().default(""),
});

export const runVirtualTryOn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.FAL_KEY;
    if (!key) throw new Error("FAL_KEY is not configured");

    const res = await fetch("https://fal.run/fal-ai/fashn/tryon/v1.6", {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_image: data.human_image_url,
        garment_image: data.garment_image_url,
        category: "auto",
      }),
    });

    const json: any = await res.json();
    if (!res.ok) {
      return { success: false, error: json?.detail || json?.error || `Fal error ${res.status}` };
    }
    return { success: true, data: json };
  });
