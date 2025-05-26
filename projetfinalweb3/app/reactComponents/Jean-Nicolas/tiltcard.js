import React, { useRef } from "react";

export default function TiltImage({ src }) {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    el.style.setProperty('--mouse-x', `${percentX}%`);
    el.style.setProperty('--mouse-y', `${percentY}%`);

    // Tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(centerY - y) / centerY * 25;
    const rotateY = (centerX - x) / centerX * 25;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    el.style.setProperty('--mouse-x', `50%`);
    el.style.setProperty('--mouse-y', `50%`);
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      className="cs-tilt-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt="..."
        className="cs-info-image"
      />
    </div>
  );
}
