import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Ruler, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { base44 } from '@/api/base44Client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ProductCard from '@/components/site/ProductCard';
import SizeChartModal from '@/components/site/SizeChartModal';
import Reveal from '@/components/site/Reveal';
import {
  CONTACT,
  PRODUCTS,
  formatPrice,
  getCategory,
  getProduct,
  getProductsByCategory,
} from '@/data/catalog';
import PageNotFound from '@/lib/PageNotFound';

export default function ProductDetail() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const product = getProduct(slug);
  const initialColorParam = searchParams.get('mau');
  const [size, setSize] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [color, setColor] = useState(() => {
    if (!product) return null;
    const match = product.colors?.find((c) => c.name === initialColorParam);
    return match ? match.name : product.colors?.[0]?.image ? product.colors[0].name : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSize(null);
    if (!product) {
      setColor(null);
      return;
    }
    const match = product.colors?.find((c) => c.name === initialColorParam);
    setColor(match ? match.name : product.colors?.[0]?.image ? product.colors[0].name : null);
  }, [slug, initialColorParam, product]);

  const colorImages = useMemo(() => {
    if (!product) return [];
    const seen = new Set();
    const list = [];
    for (const c of product.colors || []) {
      if (c.image && !seen.has(c.image)) {
        seen.add(c.image);
        list.push({ src: c.image, colorName: c.name, hex: c.hex });
      }
    }
    return list;
  }, [product]);

  if (!product) return <PageNotFound />;

  const category = getCategory(product.category);
  const sameCategory = getProductsByCategory(product.category).filter((item) => item.slug !== product.slug);
  const companions = PRODUCTS.filter(
    (item) => item.slug !== product.slug && item.category !== product.category,
  );
  const related = [...sameCategory, ...companions].slice(0, 3);

  const activeColorObj = product.colors?.find((c) => c.name === color);
  const mainImage = activeColorObj?.image || product.image;

  const zaloMessage = `${CONTACT.zalo}?text=${encodeURIComponent(
    `Chào Calem.Club, mình muốn đặt ${product.name}${size ? ` — size ${size}` : ''}${
      color ? ` — màu ${color}` : ''
    } (${formatPrice(product.price)}). Nhờ shop xác nhận và tư vấn giúp mình nhé.`,
  )}`;

  return (
    <div className="pt-24 lg:pt-[106px]">
      <div className="shell pb-4 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <span>/</span>
          <Link to={`/bo-suu-tap?danh-muc=${category.slug}`} className="hover:text-foreground">
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>
      <section className="shell grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div
            className={
              product.flatlay
                ? 'aspect-square overflow-hidden rounded-lg bg-[#F3F1EB] p-6 sm:p-10'
                : 'aspect-[4/5] overflow-hidden rounded-lg bg-[#F3F1EB]'
            }
          >
            <Image
              src={mainImage}
              alt={`${product.name}${color ? ` — màu ${color}` : ''} — ${category.name} Calem.Club`}
              className={
                product.flatlay
                  ? 'h-full w-full object-contain mix-blend-multiply'
                  : 'h-full w-full object-cover'
              }
            />
          </div>
          {colorImages.length > 1 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {colorImages.map((item) => {
                const isActive = item.colorName === color || (!color && item.src === mainImage);
                return (
                  <button
                    key={item.colorName}
                    type="button"
                    onClick={() => setColor(item.colorName)}
                    aria-label={`Xem màu ${item.colorName}`}
                    aria-pressed={isActive}
                    className={`group overflow-hidden rounded-md border transition-all ${
                      isActive
                        ? 'border-foreground ring-1 ring-foreground'
                        : 'border-transparent hover:border-foreground/30'
                    }`}
                  >
                    <div
                      className={`aspect-square overflow-hidden bg-[#F3F1EB] ${
                        product.flatlay ? 'p-2 sm:p-3' : ''
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={`${product.name} — màu ${item.colorName}`}
                        className={
                          product.flatlay
                            ? 'h-full w-full object-contain mix-blend-multiply'
                            : 'h-full w-full object-cover'
                        }
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="editorial-kicker">{category.name}</p>
          <h1 className="mt-2 font-heading text-[clamp(1.65rem,3.4vw,2.3rem)] font-semibold leading-[1.16] tracking-[-0.02em] text-foreground">
            {product.name}
          </h1>
          <div className="mt-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 tabular-nums">
            <span
              className={`font-heading text-[23px] font-semibold ${
                product.originalPrice ? 'text-[#B91C1C]' : 'text-foreground'
              }`}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-heading text-[15px] text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-sm bg-[#B91C1C] px-1.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-[0.06em] text-white">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="mt-5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">{product.short}</p>
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <p className="font-heading text-[12px] font-semibold text-foreground/80">
                Màu sắc
              </p>
              {color && (
                <span className="font-editorial italic text-[13px] text-muted-foreground">
                  {color}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-pressed={color === c.name}
                  className={`flex items-center gap-2 rounded-md border px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                    color === c.name
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-transparent text-foreground/85 hover:border-foreground/40'
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/15"
                    style={{ backgroundColor: c.hex }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-heading text-[12px] font-semibold text-foreground/80">
                Kích cỡ
              </p>
              <button
                type="button"
                onClick={() => setShowSizeChart(true)}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary underline underline-offset-4 hover:text-foreground transition-colors"
              >
                <Ruler className="h-3.5 w-3.5" />
                Bảng đo size chuẩn
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-[52px] rounded-md border px-3 py-2 font-heading text-[12.5px] font-medium transition-colors ${
                    size === s
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-transparent text-foreground/85 hover:border-foreground/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={zaloMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze flex-1"
              onClick={() => base44.analytics.track({ eventName: 'zalo_order_click', properties: { product: product.slug } })}
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
              Mua ngay qua Zalo
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="btn-outline flex-1">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              Gọi {CONTACT.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">
            Đặt qua Zalo hoặc hotline — shop tư vấn size, xác nhận giá và gửi hàng toàn quốc. Bạn cũng có thể xem thêm
            mẫu trên{' '}
            <a
              href={CONTACT.shopee}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground underline underline-offset-4"
            >
              gian hàng Shopee chính thức
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </a>
            .
          </p>
          <Accordion type="single" collapsible className="mt-10 border-t border-border">
            <AccordionItem value="chat-lieu">
              <AccordionTrigger className="font-heading text-[14px] font-medium text-foreground hover:no-underline">
                Chất liệu
              </AccordionTrigger>
              <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground">
                {product.material}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="form-dang">
              <AccordionTrigger className="font-heading text-[14px] font-medium text-foreground hover:no-underline">
                Form &amp; cách mặc
              </AccordionTrigger>
              <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground">
                {product.fit}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bao-quan">
              <AccordionTrigger className="font-heading text-[14px] font-medium text-foreground hover:no-underline">
                Bảo quản
              </AccordionTrigger>
              <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground">
                {product.care}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="doi-tra">
              <AccordionTrigger className="font-heading text-[14px] font-medium text-foreground hover:no-underline">
                Đổi trả &amp; giao hàng
              </AccordionTrigger>
              <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground">
                Đổi size trong 7 ngày nếu sản phẩm còn tag và chưa qua sử dụng. Giao hàng toàn quốc, phí và thời gian
                giao do shop xác nhận khi chốt đơn.{' '}
                <Link to="/chinh-sach-doi-tra" className="text-foreground underline underline-offset-4">
                  Xem chính sách đầy đủ
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-8 flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Bán tại cửa hàng Calem.Club và gian hàng chính thức trên Shopee Mall &amp; TikTok Mall.
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="border-t border-border py-14 lg:py-20">
          <div className="shell">
            <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
              <div>
                <p className="editorial-kicker">Có thể bạn cũng thích</p>
                <h2 className="section-title mt-1.5">
                  {sameCategory.length > 0 ? 'Gợi ý phối đồ & cùng danh mục' : 'Thiết kế khác từ Calem.Club'}
                </h2>
              </div>
              <Link
                to="/bo-suu-tap"
                className="group section-link"
              >
                Xem toàn bộ
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Desktop Sticky Purchase Bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 hidden border-t border-border bg-background/95 backdrop-blur-md py-3 shadow-lg transition-all duration-300 md:block ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 min-w-0">
            <div
              className={`h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[#F3F1EB] ${
                product.flatlay ? 'p-1' : ''
              }`}
            >
              <img
                src={mainImage}
                alt={product.name}
                className={
                  product.flatlay
                    ? 'h-full w-full object-contain mix-blend-multiply'
                    : 'h-full w-full object-cover'
                }
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-heading text-[14.5px] font-semibold text-foreground">
                {product.name}
              </p>
              <p className="text-[12px] text-muted-foreground">
                {color ? `Màu: ${color}` : 'Chưa chọn màu'} · {size ? `Size: ${size}` : 'Chưa chọn size'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right tabular-nums">
              <div
                className={`font-heading text-[17px] font-semibold ${
                  product.originalPrice ? 'text-[#B91C1C]' : 'text-foreground'
                }`}
              >
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="font-heading text-[12px] text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>

            <a
              href={zaloMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bronze !py-2.5 !px-5 text-[12px]"
              onClick={() => base44.analytics.track({ eventName: 'sticky_zalo_order_click', properties: { product: product.slug } })}
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} />
              Mua ngay qua Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        product={product}
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
      />
    </div>
  );
}
