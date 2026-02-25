import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

type KeyPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function KeyPopUp({ isOpen, onClose }: KeyPopUpProps) {

    const navigate = useNavigate();

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

    if (!isOpen) { return null; }


  return (

    <div>

      {/* custom css transitions */}
        <style>{`
            @keyframes keypopup-slide-in {
                from { transform: translateY(100%); }
                to   { transform: translateY(0); }
            }
            @keyframes keypopup-fade-in {
                from { opacity: 0; }
                to   { opacity: 1; }
            }
        `}</style>


      {/* Dimmed backdrop of the Dash — click to dismiss */}
        <div
            className="backdrop"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              zIndex: 100,
              animation: "keypopup-fade-in 0.28s ease",
            }}
            onClick={() => navigate("/dashboard")}
        />


      {/* Main parent container */}
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
          zIndex: 101,
          animation: "keypopup-slide-in 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >


      {/* Close Button */}
      <button 
          onClick={onClose} 
          style={{
              position: "absolute",
              left: "40px",
              top: "40px",
              fontSize: "3rem",
              backgroundColor: "#7B4A3B",
              color: "#F5EBDD",
              border: "none",
              cursor: "pointer",
          }}>
          x
      </button>

        {/* LEFT SIDE: Title */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 300, // font-light
              letterSpacing: "0.05em", // tracking-wide
              margin: 0,
            }}
          >
            key
          </h1>
        </div>

        {/* RIGHT SIDE: Legend */}
        <div
          style={{
            maxWidth: "40rem", // max-w-xl ~ 576px
            fontFamily: "monospace",
            lineHeight: 1, // leading-relaxed
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyleType: "disc", paddingLeft: "1rem"}}>
            <li style={{ marginBottom: "0.4rem", fontSize: "1.4rem",}}>height → rating out of five stars.</li>
            <li style={{ marginBottom: "0.4rem", fontSize: "1.4rem", }}>width → number of pages.</li>
            <li style={{ fontSize: "1.4rem",}}>spine pattern → genre.</li>
            <ul style={{ marginTop: "0.4rem", marginLeft: "4rem", padding: 0, listStyleType: "disc", fontSize: "1.4rem",}}>
              <li style={{ marginBottom: "0.2rem", fontSize: "1.4rem", }}># → literary fiction.</li>
              <li style={{ marginBottom: "0.2rem", fontSize: "1.4rem", }}>= → historical fiction.</li>
              <li style={{ marginBottom: "0.2rem", fontSize: "1.4rem", }}> &gt; → contemporary fiction.</li>
              <li style={{ marginBottom: "0.2rem", fontSize: "1.4rem", }}>{"{"} → science fiction.</li>
              <li style={{ fontSize: "1.4rem", }}>* → other.</li>
            </ul>
          </ul>
        </div>
      </div>

    </div>
  );
}