import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/site/ProductCard';
import { getProductsByCategory } from '@/data/catalog';

const CATEGORY_NOTES = {
  jeans: 'Denim wash mộc mạc, giữ phom đứng cho nhịp mặc hằng ngày.',
  knitwear: 'Len dệt mịn nhẹ, đường gân gọn gàng dễ phối nhiều lớp.',
  'polo-t-shirts': 'Cotton thoáng khí cùng phom polo và thun dài tay cơ bản.',
  'baby-tees-tops': 'Thun co giãn mềm mại, phom ôm gọn tôn dáng tự nhiên.',
  jackets: 'Áo khoác dạ peacoat và denim cổ cao giữ phom ngoài chỉn chu.',
  skirts: 'Chân váy xếp ly và dáng A nhẹ nhàng, dễ ghép cùng áo thun hay len.',
  accessories: 'Túi tote canvas và mũ len gân cho điểm nhấn gọn gàng.',
};

export function CategoryPairSection({ left, right, leftIndex = 0, rightIndex = 1 }) {
  const leftProducts = getProductsByCategory(left.slug).slice(0, 2);
  const rightProducts = getProductsByCategory(right.slug).slice(0, 2);

  return (
    <section className="border-t border-border bg-background py-14 lg:py-20">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-0">
          {[
            { category: left, products: leftProducts, idx: leftIndex, sideClass: 'lg:pr-10 xl:pr-12' },
            {
              category: right,
              products: rightProducts,
              idx: rightIndex,
              sideClass: 'border-t border-border pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-12',
            },
          ].map(({ category, products, idx, sideClass }) => {
            const chapterNum = String(idx + 1).padStart(2, '0');
            const note = CATEGORY_NOTES[category.slug];
            return (
              <div key={category.slug} className={sideClass}>
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="font-editorial italic text-[13px] text-muted-foreground">
                      Chương {chapterNum}
                    </span>
                    <h2 className="mt-1 font-heading text-[1.45rem] sm:text-[1.7rem] font-semibold tracking-[-0.02em] leading-[1.15] text-foreground">
                      {category.name}
                    </h2>
                  </div>
                  <Link
                    to={`/bo-suu-tap?danh-muc=${category.slug}`}
                    className="group section-link"
                  >
                    Xem tất cả
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                  </Link>
                </div>

                {note && (
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{note}</p>
                )}

                <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function CategorySection({ category, index = 0 }) {
  const allProducts = getProductsByCategory(category.slug);
  const products = allProducts.slice(0, 4);

  if (!products || products.length === 0) return null;

  const chapterNum = String(index + 1).padStart(2, '0');
  const note = CATEGORY_NOTES[category.slug];

  if (products.length === 2) {
    return (
      <section className="border-t border-border bg-background py-14 lg:py-20">
        <div className="shell">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="flex flex-col justify-between border-t border-foreground/20 pt-5 lg:max-w-md">
                <div>
                  <span className="font-editorial italic text-[13.5px] text-muted-foreground">
                    Chương {chapterNum}
                  </span>
                  <h2 className="section-title mt-1.5">{category.name}</h2>
                  {note && (
                    <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                      {note}
                    </p>
                  )}
                </div>
                <div className="mt-7">
                  <Link
                    to={`/bo-suu-tap?danh-muc=${category.slug}`}
                    className="group section-link border-b border-primary/30 pb-1 hover:border-foreground"
                  >
                    Khám phá {category.name} ({allProducts.length})
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1" />

            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:col-span-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const gridColsClass =
    products.length === 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-2 lg:grid-cols-4';

  return (
    <section className="border-t border-border bg-background py-14 lg:py-20">
      <div className="shell">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-editorial italic text-[13.5px] text-muted-foreground">
              Chương {chapterNum}
            </span>
            <h2 className="section-title mt-1.5">{category.name}</h2>
            {note && (
              <p className="mt-2 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground">
                {note}
              </p>
            )}
          </div>
          <Link
            to={`/bo-suu-tap?danh-muc=${category.slug}`}
            className="group section-link"
          >
            Xem tất cả ({allProducts.length})
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        </div>

        <div className={`mt-9 grid gap-x-4 gap-y-10 sm:gap-x-6 ${gridColsClass}`}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
