import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '@/components/site/ProductCard';
import Reveal from '@/components/site/Reveal';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';

const chip = (active) =>
  `rounded-md border px-3.5 py-2 font-heading text-[11.5px] font-medium transition-colors ${
    active
      ? 'border-foreground bg-foreground text-background'
      : 'border-border bg-transparent text-foreground/75 hover:border-foreground/40 hover:text-foreground'
  }`;

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const [filterKeyword, setFilterKeyword] = useState('');
  const active = params.get('danh-muc');
  const activeCategory = CATEGORIES.find((c) => c.slug === active);

  const setCategory = (slug) => {
    if (slug) setParams({ 'danh-muc': slug });
    else setParams({});
  };

  const sortedProducts = useMemo(() => {
    let list = activeCategory ? PRODUCTS.filter((p) => p.category === activeCategory.slug) : [...PRODUCTS];

    if (filterKeyword.trim()) {
      const q = filterKeyword.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.colors?.some((c) => c.name.toLowerCase().includes(q)) ||
          p.short?.toLowerCase().includes(q),
      );
    }

    if (sortBy === 'price_asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === 'deal_shock') {
      list.sort((a, b) => (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0));
    }
    return list;
  }, [activeCategory, sortBy, filterKeyword]);

  return (
    <div className="pt-24 lg:pt-[106px]">
      <section className="shell pb-6 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          {activeCategory ? (
            <>
              <Link to="/bo-suu-tap" className="hover:text-foreground transition-colors">
                Bộ sưu tập
              </Link>
              <span>/</span>
              <span className="text-foreground">{activeCategory.name}</span>
            </>
          ) : (
            <span className="text-foreground">Bộ sưu tập</span>
          )}
        </div>
        <div className="mt-6 flex flex-col gap-3 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="editorial-kicker">
              {activeCategory ? `Danh mục · ${activeCategory.name}` : 'Bộ sưu tập Calem.Club'}
            </p>
            <h1 className="section-title mt-2">
              {activeCategory ? activeCategory.name : 'Tất cả sản phẩm'}
            </h1>
          </div>
          <p className="font-heading text-[12.5px] text-muted-foreground tabular-nums">
            {sortedProducts.length} thiết kế
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => setCategory(null)} className={chip(!activeCategory)}>
            Tất cả <span className="ml-0.5 opacity-60 tabular-nums">({PRODUCTS.length})</span>
          </button>
          {CATEGORIES.map((category) => {
            const count = PRODUCTS.filter((p) => p.category === category.slug).length;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setCategory(category.slug)}
                className={chip(activeCategory?.slug === category.slug)}
              >
                {category.name} <span className="ml-0.5 opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Sort Toolbar */}
        <div className="mt-6 flex flex-col gap-3 border-y border-border/80 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Filter Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              placeholder="Lọc nhanh sản phẩm..."
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-8 text-[12.5px] font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
            />
            {filterKeyword && (
              <button
                type="button"
                onClick={() => setFilterKeyword('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center justify-end gap-2.5">
            <span className="text-[12px] font-medium text-muted-foreground">
              Sắp xếp
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sắp xếp sản phẩm"
              className="rounded-md border border-border bg-background px-3 py-2 text-[12.5px] font-medium text-foreground focus:border-foreground focus:outline-none cursor-pointer"
            >
              <option value="default">Mặc định</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
              <option value="deal_shock">Đang giảm giá</option>
            </select>
          </div>
        </div>
      </section>

      <section className="shell pb-20">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-3">
            {sortedProducts.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 3) * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-[#F3F1EB]/70 px-6 py-16 text-center">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Không tìm thấy sản phẩm phù hợp
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
              {filterKeyword
                ? `Không có sản phẩm nào khớp với từ khoá "${filterKeyword}". Bạn hãy thử tìm từ khoá khác nhé.`
                : 'Danh mục này đang được bổ sung sản phẩm mới.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory(null);
                setFilterKeyword('');
                setSortBy('default');
              }}
              className="btn-outline mt-6"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
