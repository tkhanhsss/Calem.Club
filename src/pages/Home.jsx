import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Music2, ShoppingBag } from 'lucide-react';
import Hero from '@/components/site/Hero';
import ComboPromo from '@/components/site/ComboPromo';
import CategoryStrip from '@/components/site/CategoryStrip';
import FeaturedRail from '@/components/site/FeaturedRail';
import CategorySection, { CategoryPairSection } from '@/components/site/CategorySection';
import DealShockBanner from '@/components/site/DealShockBanner';
import TrustStrip from '@/components/site/TrustStrip';
import { CATEGORIES, CONTACT, getProductsByCategory } from '@/data/catalog';

export default function Home() {
  const standardCategories = CATEGORIES.filter(
    (category) => category.slug !== 'deal-shock' && getProductsByCategory(category.slug).length > 0,
  );

  // Pair consecutive 2-product categories side-by-side so every desktop row spans 4 cohesive cards
  const blocks = [];
  let i = 0;
  while (i < standardCategories.length) {
    const cur = standardCategories[i];
    const next = standardCategories[i + 1];
    const curLen = getProductsByCategory(cur.slug).length;
    const nextLen = next ? getProductsByCategory(next.slug).length : 0;

    if (next && curLen === 2 && nextLen === 2) {
      blocks.push({ type: 'pair', left: cur, right: next, leftIndex: i, rightIndex: i + 1 });
      i += 2;
    } else {
      blocks.push({ type: 'single', category: cur, index: i });
      i += 1;
    }
  }

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedRail />
      <ComboPromo />
      <DealShockBanner />
      {blocks.map((block) =>
        block.type === 'pair' ? (
          <CategoryPairSection
            key={`${block.left.slug}-${block.right.slug}`}
            left={block.left}
            right={block.right}
            leftIndex={block.leftIndex}
            rightIndex={block.rightIndex}
          />
        ) : (
          <CategorySection key={block.category.slug} category={block.category} index={block.index} />
        ),
      )}
      <TrustStrip />
      <section className="border-t border-border py-14 lg:py-20">
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="editorial-kicker">Câu chuyện thương hiệu</p>
            <h2 className="section-title mt-2.5 max-w-xl">
              Local brand streetwear cho nhịp sống hằng ngày
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Calem.Club tập trung vào những món đồ unisex dễ mặc, phom dáng gọn gàng và chất liệu phù hợp khí hậu
              Việt Nam. Các gợi ý phối đồ và mẫu mới được cập nhật hằng tuần trên TikTok và Instagram.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid"
              >
                <Music2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                TikTok @calem.club
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Instagram className="h-3.5 w-3.5" strokeWidth={1.8} />
                Instagram
              </a>
              <a
                href={CONTACT.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} />
                Shopee Mall
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Link
              to="/chinh-sach-doi-tra"
              className="group block border-t border-foreground/20 pt-6 transition-colors hover:border-primary"
            >
              <p className="editorial-kicker">Trước khi đặt hàng</p>
              <p className="mt-3 font-heading text-[18px] font-semibold leading-snug text-foreground">
                Đổi size trong 7 ngày · Giao hàng toàn quốc · Kiểm tra trước khi nhận
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                Xem đầy đủ chính sách đổi trả, biểu phí vận chuyển và hướng dẫn chọn size chi tiết trước khi đặt mua.
              </p>
              <span className="mt-6 section-link group-hover:text-foreground">
                Xem chính sách chi tiết
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
