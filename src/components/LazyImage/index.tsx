// Libraries
import React, { useEffect, useRef, useState } from "react";

// Styles
import { Image } from "./styles";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage = React.memo(({ src, alt }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (imgElement && entry.isIntersecting) {
            imgElement.src = imgElement.dataset.src as string;
            observer.unobserve(imgElement);
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    if (imgRef) {
      observer.observe(imgElement);
    }

    return () => {
      if (imgRef) {
        observer.unobserve(imgElement);
      }
    };
  }, [src]);

  return (
    <Image
      ref={imgRef}
      data-src={src}
      alt={alt}
      loading="lazy"
      $isLoaded={isLoaded}
      onLoad={() => setIsLoaded(true)}
    />
  );
});

export default LazyImage;
