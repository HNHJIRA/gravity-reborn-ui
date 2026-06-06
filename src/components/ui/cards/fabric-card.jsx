import { HeadingText } from "../text/heading-text";

export function FabricCard({ title, img, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer group"
    >
      <div
        className={`relative w-full aspect-square overflow-hidden border-2 ${active ? "border-primary" : "border-transparent"}`}
      >
        <img
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-3 left-0 w-full flex justify-center">
          <HeadingText title={title} className="text-2xl!" />
        </div>
      </div>
    </div>
  );
}
