import BgOverlay from "../overlay/bg-overlay";
import { EyebrowText } from "../text/eye-brow-text";
import { HeadingText } from "../text/heading-text";
import { ParagraphText } from "../text/paragraph-text";

export default function BgBanner({
  imageUrl,
  overlayClass = "bg-black/60",
  eyebrow,
  title,
  highlight,
  description,
}) {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-center text-white">
      <BgOverlay imageUrl={imageUrl} overlayClass={overlayClass} />
      <div className={`relative z-10 max-w-2xl px-6 space-y-4`}>
        {eyebrow && <EyebrowText text={eyebrow} align="center" />}
        {title && (
          <HeadingText
            title={title}
            highlight={highlight}
            align="center"
            size="lg"
          />
        )}
        {description && (
          <ParagraphText
            text={description}
            className="text-white text-center"
            size="md"
          />
        )}
      </div>
    </section>
  );
}
