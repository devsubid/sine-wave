"use client";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    addEventListener(
      "resize",
      () =>
        ([canvas.width, canvas.height] = [
          window.innerWidth,
          window.innerHeight,
        ])
    );
    // variables for the sine wave
    const wave = {
      frequency: 0.01,
      waveLength: 0.01,
      amplitude: 100,
    };
    // Add event listeners for mouse drag up and down
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    // Variables to track mouse drag state
    let isDragging = false;
    let startY = 0;
    let startX = 0;

    // Event handler for mouse down
    function handleMouseDown(e: MouseEvent) {
      isDragging = true;
      startY = e.clientY;
      startX = e.clientX;
    }

    // Event handler for mouse up
    function handleMouseUp() {
      isDragging = false;
    }

    // Event handler for mouse move
    function handleMouseMove(e: MouseEvent) {
      if (isDragging) {
        // Check if it's dragging up or down, and change the amplitude
        if (e.clientY < startY && wave.amplitude < 300) {
          wave.amplitude += 2.5;
        } else if (e.clientY > startY && wave.amplitude > 0) {
          wave.amplitude -= 2.5;
        }

        // Check if it's dragging left or right, and change the wave length
        if (e.clientX < startX && wave.waveLength < 0.1) {
          wave.waveLength += 0.001;
        } else if (e.clientX > startX && wave.waveLength > 0.01) {
          wave.waveLength -= 0.001;
        }
      }
    }
    function animate() {
      requestAnimationFrame(animate);
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      // draw the sine wave
      ctx.beginPath();
      ctx.moveTo(0, innerHeight / 2);
      for (let i = 0; i < innerWidth; i++) {
        ctx.lineTo(
          i,
          innerHeight / 2 +
            Math.sin(i * wave.waveLength + wave.frequency) *
              wave.amplitude *
              Math.sin(wave.frequency)
        );
      }
      ctx.strokeStyle = "hsl(" + wave.frequency * 10 + ", 50%, 50%)";
      ctx.stroke();
      wave.frequency += 0.01;
    }
    animate();
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Canvas;
