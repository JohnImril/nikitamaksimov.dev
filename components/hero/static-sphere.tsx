import { getImageProps } from "next/image";

export function StaticSphere() {
  const {
    props: { srcSet, alt, ...imageProps },
  } = getImageProps({
    className: "sphere-still",
    src: "/hero/displaced-sphere-rest.webp",
    alt: "A violet-blue sphere with deep flowing folds and iridescent highlights.",
    width: 1440,
    height: 1440,
    loading: "eager",
    fetchPriority: "high",
    sizes: "(max-width: 1664px) 44vw, 710px",
  });

  return (
    <picture>
      {/* Match the CSS breakpoint without downloading the hidden mobile image. */}
      <source
        media="(width > 1000px)"
        srcSet={srcSet}
        sizes={imageProps.sizes}
      />
      <img
        {...imageProps}
        alt={alt}
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      />
    </picture>
  );
}
