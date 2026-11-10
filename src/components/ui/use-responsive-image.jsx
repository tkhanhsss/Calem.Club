import { useState, useEffect } from 'react';

export function useResponsiveImage(src) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return { loaded };
}

export default useResponsiveImage;
