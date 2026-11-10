import { MEDIA } from '@/data/catalog';

/**
 * Circular Calem.Club brand mark (popsicle icon) taken from the logo lock-up.
 * The logo file is 447×447 with the icon disc centered at (224,144) and a
 * 192px diameter; the crop below zooms slightly inside the disc so the white
 * background never shows at the circle's edge.
 */
export default function BrandMark({ className = 'h-9 w-9' }) {
  return (
    <span
      aria-label="Calem.Club"
      role="img"
      className={`inline-block shrink-0 rounded-full bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${MEDIA.logo}')`,
        backgroundSize: '254% 254%',
        backgroundPosition: '50% 20.7%',
      }}
    />
  );
}
