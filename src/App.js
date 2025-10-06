import React from "react";
import GradientBlinds from "./GradientBlinds";

function App() {
  return (
    <header
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔮 Gradient Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none", // ✅ ensures clicks pass through
          backgroundColor: "#060121",
        }}
      >
        <GradientBlinds
          gradientColors={["#00a384", "#00a384"]}
          angle={50}
          noise={0}
          blindCount={64}
          blindMinWidth={40}
          spotlightRadius={0.6}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={1}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* 🌟 Centered Overlay Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // ✅ vertical center
          alignItems: "center", // ✅ horizontal center
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Welcome to My Website
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
          Modern Design powered by React & WebGL ✨
        </p>
        <button
          style={{
            background: "#00a384",
            border: "none",
            color: "white",
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={() => alert("Button clicked!")}
        >
          Click Me
        </button>
      </div>

      {/* 🌘 Optional transparent overlay for extra contrast */}
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.2)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      ></div> */}
    </header>
  );
}

export default App;
