import React, {useEffect} from "react";

type KeyPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function KeyPopUp({ isOpen, onClose }: KeyPopUpProps) {

    // Prevent background scroll while modal is open
    useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }

        return () => {
        document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;


  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#7B4A3B",
        color: "#F5EBDD",
        padding: "3rem 2.5rem", // py-12 px-10
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        boxSizing: "border-box",
        position: "fixed",
        bottom: "0",
      }}
    >


    {/* Close Button */}
    <button 
        onClick={onClose} 
        style={{
            position: "absolute",
            left: "40px",
            top: "40px",
            fontSize: "60px",
            backgroundColor: "#7B4A3B",
            color: "#F5EBDD",
            border: "none",
        }}>
        ✕
    </button>

      {/* LEFT SIDE: Title */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          style={{
            fontSize: "4rem", // text-6xl ~ 60px
            fontWeight: 300, // font-light
            letterSpacing: "0.05em", // tracking-wide
            margin: 0,
          }}
        >
          * key
        </h1>
      </div>

      {/* RIGHT SIDE: Legend */}
      <div
        style={{
          maxWidth: "36rem", // max-w-xl ~ 576px
          fontFamily: "monospace",
          fontSize: "1.2rem", // text-lg ~ 18px
          lineHeight: 1.75, // leading-relaxed
        }}
      >
        <ul style={{ margin: 0, padding: 0, listStyleType: "disc", paddingLeft: "1.25rem" }}>
          <li style={{ marginBottom: "0.4rem" }}>height → rating out of five stars.</li>
          <li style={{ marginBottom: "0.4rem" }}>width → number of pages.</li>
          <li>spine pattern → genre.</li>
          <ul style={{ marginTop: "0.4rem", marginLeft: "1.5rem", padding: 0, listStyleType: "disc" }}>
            <li style={{ marginBottom: "0.2rem" }}># → literary fiction.</li>
            <li style={{ marginBottom: "0.2rem" }}>= → historical fiction.</li>
            <li style={{ marginBottom: "0.2rem" }}> &gt; → contemporary fiction.</li>
            <li style={{ marginBottom: "0.2rem" }}>{"{"} → science fiction.</li>
            <li>* → other.</li>
          </ul>
        </ul>
      </div>
    </div>
  );
}