import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/site/ProductCard';
import Reveal from '@/components/site/Reveal';
import { getFeatured } from '@/data/catalog';

export default function FeaturedRail() {
  const products = getFeatured();
  return (
    <section className="py-14 lg:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex items-end justify-between gap-5 border-b border-border pb-5">
            <div>
              <p className="editorial-kicker">Tuyển chọn tuần này</p>
              <h2 className="section-title mt-1.5">Mẫu đang được yêu thích</h2>
            </div>
            <Link
              to="/bo-suu-tap"
              className="group section-link"
            >
              Xem toàn bộ
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
