import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '',
  placeholder = '/placeholder.png'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    
    // 检查图片是否已经加载完成
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoading(false);
      return;
    }

    // 创建新的图片对象用于预加载
    const imageLoader = new Image();
    imageLoader.src = src;
    
    imageLoader.onload = () => {
      setIsLoading(false);
    };
    
    imageLoader.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <img
        ref={imgRef}
        src={hasError ? placeholder : src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default LazyImage;