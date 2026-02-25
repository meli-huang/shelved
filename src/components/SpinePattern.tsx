import React from "react";

interface SpinePatternProps {
  symbol: string;
  width: number; // px
}

const SpinePattern: React.FC<SpinePatternProps> = ({ symbol, width }) => {
  // Create a long repeated string
  const repeated = Array(30).fill(symbol).join("");

  return (
    <div
      style={{
        width: `${width}px`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontWeight: 600,
        fontSize: "32px",
        color: "#7b4a3b",
        letterSpacing: "2px",
        userSelect: "none",
      }}
    >
      {repeated}
    </div>
  );
};

export default SpinePattern;