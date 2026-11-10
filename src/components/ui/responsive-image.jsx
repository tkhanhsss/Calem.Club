import * as React from 'react';
import { Image } from '@/components/ui/image';

export function ResponsiveImage({ src, alt, className = '', ...props }) {
  return <Image src={src} alt={alt} className={className} {...props} />;
}

export default ResponsiveImage;
