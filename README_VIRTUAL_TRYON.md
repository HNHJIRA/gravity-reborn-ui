# Virtual Try-On Feature — Documentation

> **For:** antugravity (Local Backend Integration)  
> **Built by:** Lovable Agent  
> **Screenshot Reference:** `virtual-try` page — 4-step flow (Upload Portrait → Select Outfit → Live Preview → 360° Walkthrough)

---

## 1. Overview

The Virtual Try-On is a 4-step AI-powered feature on the `/virtual-try` route that lets users:

1. **Upload a portrait photo** of themselves.
2. **Select an outfit** from a curated catalog.
3. **Generate a live preview** of themselves wearing that outfit using AI image generation.
4. **Generate a 360° walkthrough** — a sequence of front / right / back / left angle shots that loop like a video walkaround.

### What You See in the Screenshot

| Step | Label | Description |
|------|-------|-------------|
| 1 | Upload Your Portrait | Drag & drop or click to upload a JPG/PNG portrait. |
| 2 | Select an Outfit | Grid of 6 pre-defined outfits (Sherwani, Prince Suit, Tuxedo, Bandhgala, Gold Achkan, Indo-Western). |
| 3 | Live Preview | AI-generated image of the user wearing the selected outfit. |
| 4 | 360° Walkthrough | AI generates 4 angle shots (front → right → back → left) and cycles them at 700ms to simulate a 360° spin. |

---

## 2. File Structure

```
src/
├── routes/
│   └── virtual-try.tsx                          # Route page: renders hero + upload flow + schedule
│
├── components/virtual-try/
│   ├── virtual-try-hero.tsx                     # Hero banner for the page
│   └── upload/
│       ├── virual-try-upload.jsx                # Main orchestrator component (manages all 4 steps)
│       ├── upload-card1.jsx                     # Step 1: Portrait upload UI
│       ├── upload-card2.jsx                     # Step 2: Outfit selection grid
│       ├── upload-card3.jsx                     # Step 3: Live preview + Try On + Download
│       └── upload-card4.jsx                     # Step 4: 360° walkthrough (frames + spin)
│
├── lib/
│   ├── tryon.functions.ts                       # Server function: AI try-on generation
│   └── walkvideo.functions.ts                   # Server function: 360° angle frame generation
│
└── mock/
    └── virtual-try-data.js                      # Outfit catalog mock data
```

---

## 3. Step-by-Step Flow

### Step 1: Upload Portrait (`upload-card1.jsx`)

- User clicks/drops an image file.
- File is read via `FileReader` into a **Data URL** (`data:image/jpeg;base64,...`).
- The Data URL is stored in React state (`humanImageUrl`) and used for all downstream AI calls.

**Key state:**
```js
humanImageFile      // File object
humanImagePreview   // Object URL for instant preview
humanImageUrl       // Data URL (base64) — sent to AI
```

### Step 2: Select Outfit (`upload-card2.jsx`)

- Displays a 2-column grid of outfits from `mock/virtual-try-data.js`.
- Each outfit has: `id`, `title`, `category` (sub-label), `imageUrl`.
- On click, the selected garment object is stored in `selectedGarment` state.
- Images come from `/images/home/card/card1.webp`, `card2.webp`, `card3.webp` (reused from homepage).

### Step 3: Live Preview (`upload-card3.jsx`)

- **Try On Now** button triggers `handleTryOn()` in `virual-try-upload.jsx`.
- This calls the server function `runVirtualTryOn` (see Backend section).
- Displays a loading spinner while AI generates.
- On success, the result image URL is shown and a **Download** button appears.
- On error, an error message is shown.

### Step 4: 360° Walkthrough (`upload-card4.jsx`)

- Two buttons:
  - **Quick 360° Preview** — toggles a CSS `spin` animation on the current preview image (fake/demo mode).
  - **Generate Walkaround** — calls the server function `generateWalkVideo`.
- The walkaround function generates **4 images**: front, right side, back, left side.
- These 4 images are stored in `frames[]` and cycled via `setInterval` at **700ms** per frame to simulate a walkaround video.
- An overlay shows `Angle X / 4` during playback.

---

## 4. Backend / AI Integration

### Current Implementation (Lovable AI Gateway)

Both AI calls use **Lovable AI Gateway** with `google/gemini-2.5-flash-image-preview`.

#### A) Try-On Generation
**File:** `src/lib/tryon.functions.ts`

```
Endpoint:  POST https://ai.gateway.lovable.dev/v1/chat/completions
Model:     google/gemini-2.5-flash-image-preview
Auth:      Authorization: Bearer {LOVABLE_API_KEY}
Input:     { human_image_url, garment_image_url, description }
Output:    { success, data: { image: { url } } }  OR  { success, error }
```

**What it does:**
- Converts both images to base64 Data URLs.
- Sends a prompt to Gemini with both images as multimodal input.
- Prompt instructs the AI to replace the person's clothing with the exact garment while preserving face, identity, hair, body, pose, skin tone, lighting, and background.
- Handles both upper-body and lower-body garments (trousers/pants/skirts included).

**Error handling:**
- `429` → Rate limit message
- `402` → Credits exhausted message
- Other → Returns status + truncated error text

#### B) 360° Walkaround Generation
**File:** `src/lib/walkvideo.functions.ts`

```
Endpoint:  POST https://ai.gateway.lovable.dev/v1/chat/completions (×4 calls)
Model:     google/gemini-2.5-flash-image-preview
Auth:      Authorization: Bearer {LOVABLE_API_KEY}
Input:     { image_url }  (the try-on result image)
Output:    { success, frames: [url_front, url_right, url_back, url_left] }  OR  { success, error }
```

**What it does:**
- Converts the result image to a Data URL.
- Makes **4 sequential calls** to generate angle shots:
  1. **Front** — same person, same outfit, photographed from the front.
  2. **Right** — 90° side profile.
  3. **Back** — 180° back view.
  4. **Left** — 270° left side profile.
- Each prompt emphasizes: identical face, identical garment, identical background and lighting.
- Returns an array of 4 image URLs.
- The client then loops through them at 700ms intervals.

**Error handling:**
- Same as try-on (429, 402) plus per-angle failure logging.
- If some angles fail but others succeed, it returns whatever frames were generated (1–4).

---

## 5. Environment Variables

| Variable | Required | Used In | Description |
|----------|----------|---------|-------------|
| `LOVABLE_API_KEY` | **Yes** | `tryon.functions.ts`, `walkvideo.functions.ts` | Auto-provisioned by Lovable. Needed for AI Gateway calls. |

> **Note for local backend migration:** Replace `process.env.LOVABLE_API_KEY` with your own AI service key or backend endpoint.

---

## 6. How to Swap in Your Old Backend

### Option A: Replace the Server Functions

The two server functions (`tryon.functions.ts` and `walkvideo.functions.ts`) are the **only backend touchpoints**. To connect your old backend:

1. **Keep the same file names and export names** so the React components don't break:
   - `runVirtualTryOn`
   - `generateWalkVideo`

2. **Replace the `.handler()` body** in each file to call your backend API instead of Lovable AI Gateway.

3. **Maintain the same return shapes:**

   **Try-on:**
   ```ts
   // Success
   { success: true, data: { image: { url: "..." } } }
   // Error
   { success: false, error: "..." }
   ```

   **Walkaround:**
   ```ts
   // Success
   { success: true, frames: ["url1", "url2", "url3", "url4"] }
   // Error
   { success: false, error: "..." }
   ```

4. **Input validation schemas** (Zod) should stay the same:
   - Try-on: `{ human_image_url: string, garment_image_url: string, description?: string }`
   - Walkaround: `{ image_url: string }`

### Option B: Create New API Routes

If your backend exposes REST endpoints:

1. Create new server routes (e.g., `src/routes/api/tryon.ts`, `src/routes/api/walkaround.ts`).
2. Update `virual-try-upload.jsx` and `upload-card4.jsx` to `fetch()` those endpoints instead of using `useServerFn`.
3. Keep the same request/response shapes as above.

### Option C: Keep the Frontend, Swap the Model

If your old backend also calls an AI model (OpenAI, Gemini, etc.):

- Update `tryon.functions.ts` and `walkvideo.functions.ts` to point to your model provider.
- Update the request body shape to match your provider's API.
- The frontend will continue to work unchanged as long as the return shape is preserved.

---

## 7. Component Props Reference

### `UploadCard1` — Portrait Upload
```jsx
<UploadCard1
  humanImagePreview={string|null}   // Object URL for preview
  uploadingHuman={boolean}          // Show loading overlay
  onSelectFile={(e) => void}        // File input onChange handler
/>
```

### `UploadCard2` — Outfit Selection
```jsx
<UploadCard2
  garments={Array<{id, title, category, imageUrl}>}
  selectedGarment={object|null}
  onSelectGarment={(garment) => void}
/>
```

### `UploadCard3` — Live Preview
```jsx
<UploadCard3
  resultImage={string|null}   // AI-generated image URL
  generating={boolean}        // Show spinner
  error={string|null}         // Error message
  onTryOn={() => void}        // Trigger try-on
  canTryOn={boolean}          // Enable/disable Try On button
/>
```

### `UploadCard4` — 360° Walkthrough
```jsx
<UploadCard4
  resultImage={string|null}   // The try-on result image URL
/>
```

---

## 8. Mock Data

**File:** `src/mock/virtual-try-data.js`

```js
outfits = [
  { title: "Royal Sherwani",    sub: "Black & Gold",       img: "/images/home/card/card1.webp" },
  { title: "Prince Suit",       sub: "Heritage Collection", img: "/images/home/card/card2.webp" },
  { title: "Black Tuxedo",      sub: "Modern Elegance",    img: "/images/home/card/card3.webp" },
  { title: "Bandhgala",         sub: "Regal Minimalism",   img: "/images/home/card/card1.webp" },
  { title: "Gold Achkan",       sub: "Ceremonial",         img: "/images/home/card/card2.webp" },
  { title: "Indo-Western",      sub: "Contemporary",       img: "/images/home/card/card3.webp" },
];
```

> **Note:** `card1.webp`, `card2.webp`, `card3.webp` are reused across outfits. You may want to map each outfit to a unique image.

---

## 9. Styling Notes

- Uses Tailwind CSS v4 with custom design tokens.
- Primary color: Gold (`border-primary`, `text-primary`, `bg-primary`).
- Background: Dark (`bg-black/40`).
- Font: Cormorant for body text, monospace for labels.
- Aspect ratio: `aspect-4/5` for all cards.
- Layout: `grid-cols-1 lg:grid-cols-12` responsive grid.

---

## 10. Known Limitations & Future Improvements

| # | Limitation | Suggested Fix |
|---|-----------|---------------|
| 1 | No real video — only 4 frames cycling at 700ms | Integrate Fal.ai (`fal-ai/kling-video`) or Runway for true video generation. |
| 2 | Outfit images are mocked and reused | Connect to a real product catalog API. |
| 3 | Lovable AI credits may run out (402 error) | Add a billing/credits check UI or switch to a paid AI provider. |
| 4 | No persistence — results disappear on refresh | Save generated images to your backend storage (S3, Supabase Storage, etc.). |
| 5 | No user accounts or history | Add auth + a "My Try-Ons" gallery page. |
| 6 | Portrait upload only supports images | Could extend to webcam capture for real-time try-on. |

---

## 11. Quick Checklist for Local Integration

- [ ] Copy the 5 component files from `src/components/virtual-try/upload/`
- [ ] Copy the 2 server function files from `src/lib/`
- [ ] Copy the route file `src/routes/virtual-try.tsx`
- [ ] Copy or replace the mock data in `src/mock/virtual-try-data.js`
- [ ] Replace `LOVABLE_API_KEY` with your own AI provider key or backend endpoint
- [ ] Ensure Tailwind has `primary` color token configured
- [ ] Test: upload → select outfit → try on → generate walkaround

---

**End of Document**
