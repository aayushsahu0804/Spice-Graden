import { useNavigate } from "react-router-dom";
import OverlayCard from "../../components/OverlayCard";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "fixed", inset: 0 }}>

      <img
        src="/bg.jpg"
        alt="restaurant"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 🔥 PASS FUNCTION DIRECTLY */}
        <OverlayCard
          onClick={() => {
            console.log("navigating...");
            navigate("/menu");
          }}
        />
      </div>
    </div>
  );
}

export default LandingPage;