import { ImageResponse } from "next/og";

export const alt = "SaliDivisione – Boost Division Rivals FC 27 da 15 €";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07090C",
          color: "#F2F5F7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          fontFamily: "sans-serif",
          border: "10px solid #C6F432",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 800 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#C6F432",
              display: "flex",
            }}
          />
          SALIDIVISIONE<span style={{ color: "#C6F432" }}>.IT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 900, lineHeight: 0.95 }}>
          <span>SALI DI DIVISIONE.</span>
          <span style={{ color: "#C6F432" }}>SENZA GIOCARE.</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 34, color: "#C9D1DB" }}>
          <span>Boost Rivals FC 27</span>
          <span style={{ color: "#C6F432" }}>da 15 €</span>
          <span>· stream gratis</span>
        </div>
      </div>
    ),
    size,
  );
}
