import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/catalog';

export default function CategoryStrip() {
  return (
    <section className="border-y border-border bg-[#F3F1EB]/60">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <div className="flex min-w-0 items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 font-editorial italic text-[13px] text-muted-foreground">
            Danh mục
          </span>
          {CATEGORIES.map((category, idx) => (
            <Link
              key={category.slug}
              to={`/bo-suu-tap?danh-muc=${category.slug}`}
              className="group shrink-0 whitespace-nowrap font-heading text-[12.5px] font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              <span className="mr-1.5 font-editorial italic text-[11.5px] text-muted-foreground/75 group-hover:text-primary">
                0{idx + 1}
              </span>
              {category.name}
            </Link>
          ))}
        </div>

        <Link
          to="/bo-suu-tap"
          className="section-link hidden sm:inline-flex"
        >
          Tất cả
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}
