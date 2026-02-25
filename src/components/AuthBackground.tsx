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
          backgroundColor: "#a4c8e3",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#F4EFE6",
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
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "4.5rem",
              color: "#6b4032",
            }}
          >
            shelved

            <div
              style={{
                fontSize: "1.1rem",
                marginTop: "10px",
              }}>
              your reading log turned data viz!
            </div>
          </div>

          {/* Divider made up of stars! */}
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "3rem",
              color: "#7A4B3A",
              overflow: "hidden",
            }}
          >
            {"*".repeat(30)}
          </div>

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