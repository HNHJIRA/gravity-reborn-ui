export default function BgOverlay({
  imageUrl,
  className = "",
  style = {},
  overlayClass = "",
}) {
  return (
    <div
      className={`absolute inset-0 bg-cover bg-top bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        ...style,
      }}
    >
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
