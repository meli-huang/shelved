import React from "react";

export default function KeyPopUp() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#7B4A3B",
        color: "#F5EBDD",
        padding: "3rem 2.5rem", // py-12 px-10
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT SIDE: Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            fontSize: "3.75rem", // text-6xl ~ 60px
            fontWeight: 300, // font-light
            letterSpacing: "0.05em", // tracking-wide
            margin: 0,
          }}
        >
          * Key
        </h1>
      </div>

      {/* RIGHT SIDE: Legend */}
      <div
        style={{
          maxWidth: "36rem", // max-w-xl ~ 576px
          fontFamily: "monospace",
          fontSize: "1.125rem", // text-lg ~ 18px
          lineHeight: 1.75, // leading-relaxed
        }}
      >
        <ul style={{ margin: 0, padding: 0, listStyleType: "disc", paddingLeft: "1.25rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>height → rating out of five stars.</li>
          <li style={{ marginBottom: "0.5rem" }}>width → number of pages.</li>
          <li>spine pattern → genre.</li>
          <ul style={{ marginTop: "0.5rem", marginLeft: "1.5rem", padding: 0, listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.25rem" }}># → literary fiction.</li>
            <li style={{ marginBottom: "0.25rem" }}>= → historical fiction.</li>
            <li style={{ marginBottom: "0.25rem" }}> &gt; → contemporary fiction.</li>
            <li style={{ marginBottom: "0.25rem" }}>{"{"} → science fiction.</li>
            <li>* → other.</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}