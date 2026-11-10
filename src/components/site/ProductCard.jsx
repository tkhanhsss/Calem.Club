import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { formatPrice, getCategory } from '@/data/catalog';

export default function ProductCard({ product }) {
  const category = getCategory(product.category);
  const [selectedColor, setSelectedColor] = useState(null);

  const hasColorImages = product.colors?.some((color) => Boolean(color.image));
  const activeColor = product.colors?.find((color) => color.name === selectedColor);
  const displayImage = activeColor?.image || product.image;
  const productHref = selectedColor
    ? `/san-pham/${product.slug}?mau=${encodeURIComponent(selectedColor)}`
    : `/san-pham/${product.slug}`;

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group">
      <Link
        to={productHref}
        className="block overflow-hidden rounded-md bg-[#F3F1EB]"
        aria-label={product.name}
      >
        <div className={`relative aspect-square w-full overflow-hidden ${product.flatlay ? 'p-5 sm:p-6' : ''}`}>
          <Image
            src={displayImage}
            alt={`${product.name}${selectedColor ? ` — ${selectedColor}` : ''} — ${category?.name || ''} Calem.Club`}
            className={
              product.flatlay
                ? 'h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]'
                : 'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
            }
          />
        </div>
      </Link>

      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={productHref}
            className="min-w-0 font-heading text-[13.5px] sm:text-[14px] font-medium leading-snug text-foreground transition-colors group-hover:text-primary"
          >
            {product.name}
          </Link>
          <div className="shrink-0 text-right tabular-nums">
            {product.originalPrice ? (
              <div className="flex flex-col items-end leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="rounded-sm bg-[#B91C1C]/10 px-1.5 py-0.5 font-heading text-[10px] font-semibold text-[#B91C1C]">
                    -{discountPct}%
                  </span>
                  <span className="font-heading text-[14px] font-semibold text-[#B91C1C]">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <span className="mt-1 font-heading text-[11.5px] text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
            ) : (
              <span className="font-heading text-[13.5px] sm:text-[14px] font-medium text-foreground/85">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="font-editorial italic text-[12px] text-muted-foreground">
            {category?.name}
          </p>

          {product.colors?.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return hasColorImages ? (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    aria-label={`Chọn màu ${color.name}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-3 w-3 rounded-full border transition-all ${
                      isSelected
                        ? 'border-foreground ring-1 ring-foreground ring-offset-1'
                        : 'border-black/15 hover:border-foreground/60'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ) : (
                  <span
                    key={color.name}
                    title={color.name}
                    aria-label={color.name}
                    className="h-2.5 w-2.5 rounded-full border border-black/15"
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
