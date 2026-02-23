import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthBackground({ children }: Props) {
  return (
    <div
      style={{
        width: "100vw", 
        height: "100vh",
        backgroundColor: "#7b4a3b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "70vh",
          maxHeight: "1000px",
          maxWidth: "1400px",
          backgroundColor: "#9fb7c9",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#e8dfcf",
            display: "flex",
            width: "95%",
            height: "100%",
          }}
        >
          {/* Left Side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "72px",
              color: "#6b4032",
              fontFamily: "monospace",
              letterSpacing: "4px",
            }}
          >
            shelved
          </div>

          {/* Divider */}
          <div
            style={{
              width: "2px",
              borderRight: "10px dashed #6b4032",
            }}
          />

          {/* Right Side */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}