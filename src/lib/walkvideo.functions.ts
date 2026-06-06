import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  image_url: z.string().min(1),
});

// Use Fal queue API to submit an image-to-video job and poll until done.
// Model: Kling 1.6 image-to-video (good motion + identity preservation).
const MODEL = "fal-ai/kling-video/v1.6/standard/image-to-video";

export const generateWalkVideo = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.FAL_KEY;
    if (!key) {
      return { success: false, error: "FAL_KEY is not configured." };
    }

    const prompt =
      "The person walks forward naturally with a confident catwalk stride. The camera smoothly orbits 360 degrees around the person, showing them from the front, side, and back so the full outfit is visible from every angle. Cinematic lighting, photorealistic, sharp focus on the outfit, stable smooth motion.";

    // 1. Submit job
    const submitRes = await fetch(`https://queue.fal.run/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_url: data.image_url,
        duration: "5",
        aspect_ratio: "9:16",
      }),
    });

    if (!submitRes.ok) {
      const txt = await submitRes.text();
      console.error("Fal submit failed", submitRes.status, txt);
      if (submitRes.status === 401 || submitRes.status === 403) {
        return { success: false, error: `Fal auth failed (${submitRes.status}): ${txt.slice(0, 200)}` };
      }
      if (txt.toLowerCase().includes("exhausted") || submitRes.status === 402) {
        return { success: false, error: "Fal credits exhausted. Top up at fal.ai/dashboard/billing." };
      }
      return { success: false, error: `Fal submit error ${submitRes.status}: ${txt.slice(0, 200)}` };
    }

    const submitJson: any = await submitRes.json();
    const requestId: string | undefined = submitJson?.request_id;
    const statusUrl: string | undefined = submitJson?.status_url;
    const responseUrl: string | undefined = submitJson?.response_url;
    if (!requestId || !statusUrl || !responseUrl) {
      return { success: false, error: "Fal did not return a request id." };
    }

    // 2. Poll for completion (max ~3 minutes)
    const start = Date.now();
    const maxMs = 3 * 60 * 1000;
    while (Date.now() - start < maxMs) {
      await new Promise((r) => setTimeout(r, 4000));
      const statusRes = await fetch(statusUrl, {
        headers: { Authorization: `Key ${key}` },
      });
      if (!statusRes.ok) continue;
      const statusJson: any = await statusRes.json();
      const status = statusJson?.status;
      if (status === "COMPLETED") {
        const finalRes = await fetch(responseUrl, {
          headers: { Authorization: `Key ${key}` },
        });
        if (!finalRes.ok) {
          return { success: false, error: "Failed to fetch Fal result." };
        }
        const finalJson: any = await finalRes.json();
        const videoUrl = finalJson?.video?.url || finalJson?.video_url || null;
        if (!videoUrl) {
          return { success: false, error: "Fal returned no video URL." };
        }
        return { success: true, video_url: videoUrl };
      }
      if (status === "FAILED" || status === "ERROR") {
        return { success: false, error: "Video generation failed on Fal." };
      }
    }

    return { success: false, error: "Video generation timed out. Try again." };
  });
