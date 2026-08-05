import { ImageResponse } from "next/og";
export const alt = "Nikita Maksimov — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#f3f5f7",
        background:
          "radial-gradient(circle at 80% 15%, #28325e 0, #0b0d10 48%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            background: "#8ba8ff",
          }}
        />{" "}
        Nikita Maksimov
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#9cabe1",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Frontend Engineer
        </div>
        <div
          style={{
            fontSize: 66,
            lineHeight: 1.04,
            maxWidth: 950,
            marginTop: 22,
          }}
        >
          Complex, fast and maintainable web products.
        </div>
      </div>
      <div style={{ color: "#98a2b3", fontSize: 22 }}>
        React · Next.js · TypeScript · Architecture · Performance · AI
        Engineering
      </div>
    </div>,
    size,
  );
}
