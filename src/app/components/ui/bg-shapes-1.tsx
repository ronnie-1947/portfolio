import React from "react";

const BgShapes1 = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {/* Large hollow ring — top left */}
      <div
        className="absolute w-45 h-45 rounded-full top-[8%] left-[4%]"
        style={{
          border: "1.5px solid rgba(6,182,212,0.35)",
          animation: "float 16s ease-in-out infinite",
        }}
      />
      {/* Small filled dot — top right */}
      <div
        className="absolute w-12 h-12 rounded-full bg-indigo-500/25 top-[13%] right-[9%]"
        style={{
          animation: "float-alt 11s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
      {/* Medium hollow ring — center right */}
      <div
        className="absolute w-25 h-25 rounded-full top-[42%] right-[5%]"
        style={{
          border: "1.5px solid rgba(168,85,247,0.3)",
          animation: "float 13s ease-in-out infinite",
          animationDelay: "1s",
        }}
      />
      {/* Large hollow ring — bottom right */}
      <div
        className="absolute w-55 h-55 rounded-full bottom-[8%] right-[2%]"
        style={{
          border: "1.5px solid rgba(99,102,241,0.22)",
          animation: "float-alt 19s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />
      {/* Small filled dot — bottom left */}
      <div
        className="absolute w-8.5 h-8.5 rounded-full bg-cyan-500/22 bottom-[22%] left-[7%]"
        style={{
          animation: "float 12s ease-in-out infinite",
          animationDelay: "4s",
        }}
      />
      {/* Medium hollow ring — upper center-right */}
      <div
        className="absolute w-32.5 h-32.5 rounded-full top-[4%] left-[57%]"
        style={{
          border: "1.5px solid rgba(6,182,212,0.25)",
          animation: "float-alt 15s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />
      {/* Tiny dot — left mid */}
      <div
        className="absolute w-5.5 h-5.5 rounded-full bg-purple-500/[.28] top-[58%] left-[11%]"
        style={{
          animation: "float 9s ease-in-out infinite",
          animationDelay: "2.5s",
        }}
      />
      {/* Small hollow ring — bottom center-left */}
      <div
        className="absolute w-17.5 h-17.5 rounded-full bottom-[15%] left-[30%]"
        style={{
          border: "1.5px solid rgba(168,85,247,0.28)",
          animation: "float-alt 14s ease-in-out infinite",
          animationDelay: "1.5s",
        }}
      />
    </div>
  );
};

export default BgShapes1;
