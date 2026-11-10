import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { PRODUCTS, CATEGORIES, formatPrice } from '@/data/catalog';

const POPULAR_SUGGESTIONS = [
  'Hoodie',
  'Jeans',
  'Len',
  'Áo khoác',
  'Chân váy',
  'Polo',
  'Baby tee',
  'Mũ',
];

export default function QuickSearchModal({ isOpen, open, onClose }) {
  const show = Boolean(isOpen ?? open);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) {
      setQuery('');
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 6);

    return PRODUCTS.filter((product) => {
      const cat = CATEGORIES.find((c) => c.slug === product.category);
      const nameMatch = product.name.toLowerCase().includes(q);
      const catMatch = cat?.name?.toLowerCase().includes(q);
      const colorMatch = product.colors?.some((c) => c.name.toLowerCase().includes(q));
      const shortMatch = product.short?.toLowerCase().includes(q);
      const matMatch = product.material?.toLowerCase().includes(q);
      return nameMatch || catMatch || colorMatch || shortMatch || matMatch;
    });
  }, [query]);

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/san-pham/${slug}`);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 sm:pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl transition-all">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên sản phẩm, loại áo, quần, màu sắc..."
            className="w-full bg-transparent text-[15px] font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-md p-1 text-muted-foreground hover:bg-[#F3F1EB] hover:text-foreground"
              aria-label="Xoá tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden rounded-md border border-border bg-[#F3F1EB] px-2 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline-block">
              ESC
            </kbd>
          )}
        </div>

        {/* Popular Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border/70 bg-[#F3F1EB]/70 px-5 py-2.5">
          <span className="font-editorial italic text-[12px] text-muted-foreground mr-1">
            Gợi ý:
          </span>
          {POPULAR_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => setQuery(sug)}
              className="rounded-md border border-border bg-background px-2.5 py-0.5 text-[11.5px] font-medium text-foreground/80 transition-colors hover:border-foreground hover:text-foreground"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          <div className="px-3 py-1.5 font-heading text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {query.trim()
              ? `Kết quả tìm kiếm (${results.length})`
              : `Đề xuất nổi bật (${results.length})`}
          </div>

          {results.length > 0 ? (
            <div className="mt-1 divide-y divide-border/50">
              {results.map((product) => {
                const cat = CATEGORIES.find((c) => c.slug === product.category);
                return (
                  <button
                    key={product.slug}
                    type="button"
                    onClick={() => handleSelectProduct(product.slug)}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F1EB]/80"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#F3F1EB] ${
                          product.flatlay ? 'p-1' : ''
                        }`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${
                            product.flatlay ? 'object-contain mix-blend-multiply' : 'object-cover'
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-[14px] font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {product.name}
                          </span>
                          {product.originalPrice && (
                            <span className="rounded-sm bg-[#B91C1C] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-white">
                              Sale
                            </span>
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                          <span className="font-editorial italic">{cat?.name}</span>
                          {product.colors?.length > 0 && (
                            <>
                              <span>·</span>
                              <div className="flex items-center gap-1">
                                {product.colors.map((c) => (
                                  <span
                                    key={c.name}
                                    title={c.name}
                                    className="h-2.5 w-2.5 rounded-full border border-black/15"
                                    style={{ backgroundColor: c.hex }}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 text-right tabular-nums">
                      <div>
                        <div
                          className={`font-heading text-[14px] font-semibold ${
                            product.originalPrice ? 'text-[#B91C1C]' : 'text-foreground'
                          }`}
                        >
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="font-heading text-[11px] text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      <div className="rounded-md border border-border p-1.5 text-muted-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="font-heading text-[14px] font-semibold text-foreground">
                Không tìm thấy sản phẩm nào khớp với &quot;{query}&quot;
              </p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                Thử tìm bằng từ khoá ngắn hơn như &quot;jean&quot;, &quot;polo&quot;, &quot;hoodie&quot; hoặc &quot;len&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-border bg-[#F3F1EB]/70 px-5 py-2.5 text-[11.5px] text-muted-foreground">
          <span>Tìm kiếm nhanh tại Calem.Club</span>
          <span className="hidden sm:inline">Phím tắt nhanh: <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-medium">Ctrl</kbd> + <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-medium">K</kbd></span>
        </div>
      </div>
    </div>
  );
}
