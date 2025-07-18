import React from "react";

interface AvatarOrbitProps {
  images: string[];
  size?: number;
  radius?: number;
  duration?: number;
}

export const AvatarOrbit: React.FC<AvatarOrbitProps> = ({
  images,
  size = 60,
  radius = 120,
  duration = 5,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: `${radius * 2 + size}px`,
        height: `${radius * 2 + size}px`,
      }}
    >
      {images.map((src, i) => {
        const angle = (360 / images.length) * i;
        return (
          <img
            key={i}
            src={src}
            alt={`头像${i}`}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              left: `calc(50% - ${size / 2}px)`,
              top: `calc(50% - ${size / 2}px)`,
              transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
              animation: `avatar-orbit ${duration}s linear infinite`,
              animationDelay: `${(duration / images.length) * i}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes avatar-orbit {
          0% { transform: rotate(var(--angle, 0deg)) translateX(var(--radius, 120px)) rotate(calc(-1 * var(--angle, 0deg))); }
          100% { transform: rotate(calc(360deg + var(--angle, 0deg))) translateX(var(--radius, 120px)) rotate(calc(-360deg - var(--angle, 0deg))); }
        }
      `}</style>
    </div>
  );
};
