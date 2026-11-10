import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { getProductsByCategory, formatPrice, ORDER_LINK } from '@/data/catalog';

export default function DealShockBanner() {
  const products = getProductsByCategory('deal-shock');
  const product = products[0];

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || null);

  if (!product) return null;

  const activeColor = product.colors?.find((c) => c.name === selectedColor) || product.colors?.[0];
  const displayImage = activeColor?.image || product.image;
  const productHref = selectedColor
    ? `/san-pham/${product.slug}?mau=${encodeURIComponent(selectedColor)}`
    : `/san-pham/${product.slug}`;

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <section className="border-t border-border bg-[#F3F1EB] py-14 lg:py-20">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-center lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="font-editorial italic text-[14px] text-[#B91C1C]">
                Ưu đãi số lượng có hạn
              </span>
              {discountPercent > 0 && (
                <span className="rounded-sm bg-[#B91C1C] px-1.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.06em] text-white tabular-nums">
                  -{discountPercent}%
                </span>
              )}
            </div>

            <h2 className="mt-3 font-heading text-[clamp(1.85rem,3.4vw,2.6rem)] font-semibold tracking-[-0.025em] leading-[1.1] text-foreground">
              {product.name}
            </h2>

            <p className="mt-3.5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {product.short}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border/80 py-3 text-[12px] text-foreground/75">
              <span>Nỉ bông 380gsm</span>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <span>Phom Oversize Unisex</span>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <span>Mũ 2 lớp đứng phom</span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3 tabular-nums">
              <span className="font-heading text-[28px] sm:text-[32px] font-semibold tracking-tight text-[#B91C1C]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-heading text-[16px] font-normal text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.colors?.length > 0 && (
              <div className="mt-6">
                <p className="font-heading text-[12px] font-medium text-muted-foreground">
                  Màu sắc — <span className="font-semibold text-foreground">{activeColor?.name}</span>
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        aria-label={`Chọn màu ${c.name}`}
                        aria-pressed={isSelected}
                        className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12.5px] transition-colors ${
                          isSelected
                            ? 'border-foreground bg-foreground text-background font-medium'
                            : 'border-border bg-background/80 text-foreground/80 hover:border-foreground/40'
                        }`}
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-black/15"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={productHref} className="btn-solid">
                Xem chi tiết
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
              </Link>
              <a
                href={ORDER_LINK(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline bg-background"
              >
                Đặt qua Zalo
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:col-span-6">
            <Link
              to={productHref}
              className="group relative aspect-square w-full max-w-[460px] overflow-hidden rounded-md bg-[#E9E5DA] p-6 sm:p-10"
              aria-label={`Xem chi tiết ${product.name}`}
            >
              <Image
                src={displayImage}
                alt={`${product.name} — màu ${activeColor?.name || ''}`}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
