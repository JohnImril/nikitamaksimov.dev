import Image from "next/image";
const root = "/projects/insomnia-feeder/";

export function FeederHero({ priority = false }: { priority?: boolean }) {
  return (
    <div className="feeder-hero-image">
      <Image
        src={root + "hero-admin-mobile.webp"}
        alt="Feeder desktop volunteer administration and mobile volunteer cards shown side by side, using prepared synthetic records"
        width={1600}
        height={900}
        sizes="(max-width: 1000px) 100vw, 1200px"
        loading={priority ? "eager" : "lazy"}
      />
    </div>
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
