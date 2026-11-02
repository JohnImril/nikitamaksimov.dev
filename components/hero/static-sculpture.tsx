import Image from "next/image";

export function StaticSculpture() {
  return (
    <Image
      className="sculpture-still"
      src="/hero/sculpture-rest.webp"
      alt="A graphite sculpture of ten interlocking, beveled modules. Light flows through its inner channels as one part is replaced and the working structure evolves."
      width={1440}
      height={1440}
      loading="eager"
      fetchPriority="low"
      sizes="(max-width: 1000px) 1px, (max-width: 1664px) 44vw, 710px"
    />
  );
}
