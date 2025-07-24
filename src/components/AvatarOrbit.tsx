import React from "react";

interface AvatarOrbitProps {
  images: string[];
  size?: number;
  radius?: number;
  duration?: number;
  orbitCount?: number; // 添加轨道数量参数
}

export const AvatarOrbit: React.FC<AvatarOrbitProps> = ({
  images,
  size = 60,
  radius = 120,
  duration = 5,
  orbitCount = 1, // 默认轨道数量为1
}) => {
  // 创建多个轨道的头像
  const renderOrbit = (orbitIndex: number) => {
    const currentRadius = radius + (orbitIndex * 60); // 每个轨道半径增加60px
    const currentDuration = duration + (orbitIndex * 2); // 外轨道转得更慢
    
    return images.map((src, i) => {
      const angle = (360 / images.length) * i + (orbitIndex * 30); // 每个轨道偏移30度
      return (
        <img
          key={`${orbitIndex}-${i}`}
          src={src}
          alt={`头像${orbitIndex}-${i}`}
          style={{
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            left: `calc(50% - ${size / 2}px)`,
            top: `calc(50% - ${size / 2}px)`,
            transform: `rotate(${angle}deg) translateX(${currentRadius}px) rotate(-${angle}deg)`,
            animation: `avatar-orbit ${currentDuration}s linear infinite`,
            animationDelay: `${(currentDuration / images.length) * i}s`,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: "3px solid white",
          }}
        />
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${(radius + (orbitCount - 1) * 60) * 2 + size}px`,
        height: `${(radius + (orbitCount - 1) * 60) * 2 + size}px`,
      }}
    >
      {/* 渲染多个轨道 */}
      {Array.from({ length: orbitCount }).map((_, orbitIndex) => (
        <React.Fragment key={orbitIndex}>
          {renderOrbit(orbitIndex)}
        </React.Fragment>
      ))}
      
      {/* 中心装饰圆 */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20px",
          height: "20px",
          backgroundColor: "var(--bs-primary)",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(255, 159, 67, 0.5)",
        }}
      />
      
      <style>{`
        @keyframes avatar-orbit {
          0% { 
            transform: rotate(var(--angle, 0deg)) translateX(var(--radius, 120px)) rotate(calc(-1 * var(--angle, 0deg))); 
          }
          100% { 
            transform: rotate(calc(360deg + var(--angle, 0deg))) translateX(var(--radius, 120px)) rotate(calc(-360deg - var(--angle, 0deg))); 
          }
        }
      `}</style>
    </div>
  );
};