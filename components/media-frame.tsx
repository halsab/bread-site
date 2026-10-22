import Image from "next/image";

type MediaFrameProps = {
  alt: string;
  className?: string;
  preload?: boolean;
  ratio: "landscape" | "portrait" | "square";
  sizes: string;
  src?: string;
};

export function MediaFrame({
  alt,
  className,
  preload = false,
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
            preload={preload}
            sizes={sizes}
            src={src}
          />
        ) : null}
      </div>
    </figure>
  );
}
