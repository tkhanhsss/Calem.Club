import { cn } from '@/lib/utils';

export function Image({ src, alt, className = '', loading = 'eager', ...props }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      loading={loading}
      decoding="async"
      className={cn(className)}
      {...props}
    />
  );
}

export default Image;
