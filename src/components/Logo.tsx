"use client";

import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 200,
  height = 50,
  className = ""
}: LogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas DPI for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Create gradient for the icon
    const iconGradient = ctx.createLinearGradient(0, 0, 40, 50);
    iconGradient.addColorStop(0, "#4F46E5");
    iconGradient.addColorStop(1, "#7C3AED");

    // Draw document shape
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.lineTo(40, 37.5);
    ctx.lineTo(30, 50);
    ctx.lineTo(0, 50);
    ctx.closePath();
    ctx.fillStyle = iconGradient;

    // Add subtle shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    // Draw folded corner
    ctx.beginPath();
    ctx.moveTo(30, 37.5);
    ctx.lineTo(40, 37.5);
    ctx.lineTo(40, 50);
    ctx.lineTo(30, 50);
    ctx.closePath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.shadowColor = "transparent";
    ctx.fill();

    // Draw "R" letter
    ctx.font = "bold 24px Inter";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("R", 20, 25);

    // Draw text with gradient
    const textGradient = ctx.createLinearGradient(50, 0, 200, 0);
    textGradient.addColorStop(0, "#ffffff");
    textGradient.addColorStop(1, "#e2e8f0");

    ctx.font = `bold 24px ${inter.style.fontFamily}`;
    ctx.fillStyle = textGradient;
    ctx.fillText("ResumeAI", 120, 25);

    // Add subtle glow effect
    ctx.globalCompositeOperation = "destination-over";
    const glowGradient = ctx.createRadialGradient(40, 25, 0, 40, 25, 40);
    glowGradient.addColorStop(0, "rgba(79, 70, 229, 0.1)");
    glowGradient.addColorStop(1, "transparent");
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  return (
    <div className={`relative select-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width,
          height,
          pointerEvents: "none"
        }}
        className="drop-shadow-lg filter"
      />
      {/* Invisible overlay to prevent selection */}
      <div
        className="absolute inset-0"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
