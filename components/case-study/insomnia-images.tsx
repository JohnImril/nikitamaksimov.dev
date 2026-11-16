import Image, { getImageProps } from "next/image";
const root = "/projects/insomnia-feeder/";

export function FeederHero({ priority = false }: { priority?: boolean }) {
  const { props: mobile } = getImageProps({
    src: `${root}hero-mobile.webp`,
    alt: "",
    width: 430,
    height: 884,
    sizes: "100vw",
  });
  const { props: desktop } = getImageProps({
    src: `${root}hero-composition.webp`,
    alt: "Feeder volunteer administration with arrival statuses and inventory, alongside the group-badge field scanner",
    width: 1440,
    height: 920,
    sizes: "(max-width: 800px) 100vw, 1200px",
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
  });
  return (
    <picture className="feeder-hero-image">
      <source
        media="(max-width: 480px)"
        srcSet={mobile.srcSet}
        sizes={mobile.sizes}
        width={430}
        height={884}
      />
      <img {...desktop} alt={desktop.alt} />
    </picture>
  );
}

export function ProductShot({
  name,
  alt,
  caption,
  width,
  height,
  phone = false,
}: {
  name: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  phone?: boolean;
}) {
  return (
    <figure className={`feeder-shot${phone ? "feeder-phone" : ""}`}>
      <a
        href={`${root}${name}.webp`}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size image: ${alt} (new tab)`}
      >
        <Image
          src={`${root}${name}.webp`}
          alt={alt}
          width={width}
          height={height}
          sizes={
            phone
              ? "(max-width: 480px) 85vw, 340px"
              : "(max-width: 800px) 100vw, 1280px"
          }
        />
        <span className="feeder-open">View full size ↗</span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
