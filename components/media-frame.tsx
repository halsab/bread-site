import Image from "next/image";

const staticAssetBase = process.env.BREAD_DEPLOY_TARGET === "github-pages" ? "/bread-site" : "";

type MediaFrameProps = {
  alt: string;
  className?: string;
  motion?: "vertical" | "horizontal" | "gentle" | "full-bleed";
  preload?: boolean;
  ratio: "landscape" | "portrait" | "square";
  sizes: string;
  src?: string;
};

export function MediaFrame({
  alt,
  className,
  motion,
  preload = false,
  ratio,
  sizes,
  src,
}: MediaFrameProps) {
  return (
    <figure
      className={`media-frame media-frame--${ratio}${className ? ` ${className}` : ""}`}
      data-photo-motion={motion}
    >
      <div className="media-frame__surface">
        <div className="media-frame__motion">
          {src ? (
            <Image
              alt={alt}
              className="media-frame__image"
              fill
              preload={preload}
              sizes={sizes}
              src={`${staticAssetBase}${src}`}
            />
          ) : null}
        </div>
      </div>
    </figure>
  );
}
