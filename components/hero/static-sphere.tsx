import Image from "next/image";

export function StaticSphere() {
  return (
    <Image
      className="sphere-still"
      src="/hero/displaced-sphere-rest.webp"
      alt="A violet-blue sphere with deep flowing folds and iridescent highlights."
      width={1440}
      height={1440}
      loading="eager"
      fetchPriority="low"
      sizes="(max-width: 1000px) 1px, (max-width: 1664px) 44vw, 710px"
    />
  );
}
