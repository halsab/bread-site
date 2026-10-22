import Image from "next/image";

type MediaFrameProps = {
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
  ratio: "landscape" | "portrait" | "square";
  sizes: string;
  src?: string;
};

export function MediaFrame({
  alt,
  caption,
  className,
  priority = false,
  ratio,
  sizes,
  src,
}: MediaFrameProps) {
  return (
    <figure className={`media-frame media-frame--${ratio}${className ? ` ${className}` : ""}`}>
      <div className="media-frame__surface">
        {src ? (
          <Image
            alt={alt}
            className="media-frame__image"
            fill
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            src={src}
          />
        ) : (
          <span aria-hidden="true" className="media-frame__placeholder">
            Фото появится здесь
          </span>
        )}
      </div>
      <figcaption className="media-frame__caption">{caption}</figcaption>
    </figure>
  );
}
