import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/site/Reveal';
import { CONTACT } from '@/data/catalog';

const BANNER = 'https://media.base44.com/images/public/6ae384f780ef436b44a1181c/ea3e7517e_image.png';
const GUIDE = 'https://media.base44.com/images/public/6ae384f780ef436b44a1181c/1adffb832_image.png';

const TIERS = [
  { qty: 'Combo 2 sản phẩm', discount: 'Giảm 10%' },
  { qty: 'Combo 3 sản phẩm', discount: 'Giảm 12%' },
  { qty: 'Combo từ 4 sản phẩm', discount: 'Giảm 15%' },
];

export default function ComboPromo() {
  return (
    <section className="border-t border-border bg-background py-14 lg:py-20">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Story & Offer Breakdown */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="editorial-kicker">Chương trình phối đồ theo set</p>
              <h2 className="section-title mt-2.5">Mua theo combo, tiết kiệm đến 15%</h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">
                Áp dụng trực tiếp khi phối nhiều món cùng đơn trên gian hàng chính thức Calem.Club Shopee Mall — dễ
                dàng ghép áo polo, len và quần jeans cho cả tuần mặc đẹp.
              </p>

              <div className="mt-7 divide-y divide-border border-y border-border">
                {TIERS.map((tier) => (
                  <div key={tier.qty} className="flex items-center justify-between py-3.5 text-[13.5px]">
                    <span className="text-foreground/80">{tier.qty}</span>
                    <span className="font-heading font-semibold text-primary">{tier.discount}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <a
                  href={CONTACT.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid"
                >
                  Xem combo trên Shopee
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Curated Framed Campaign Prints */}
          <div className="lg:col-span-7">
            <div className="mx-auto grid w-full max-w-[580px] grid-cols-2 items-start gap-4 sm:gap-5 lg:ml-auto lg:mr-0">
              <Reveal>
                <a
                  href={CONTACT.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-md border border-border/80 bg-white p-1.5 shadow-xs transition-colors group-hover:border-foreground/30">
                    <img
                      src={BANNER}
                      alt="Ưu đãi combo Calem.Club: mua 2 giảm 10%, mua 3 giảm 12%, mua 4 giảm 15%"
                      className="block h-auto w-full rounded-sm"
                    />
                  </div>
                  <p className="mt-2 font-editorial italic text-[11.5px] text-muted-foreground">
                    Hình 01 · Mức ưu đãi theo số lượng
                  </p>
                </a>
              </Reveal>
              <Reveal>
                <a
                  href={CONTACT.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-md border border-border/80 bg-white p-1.5 shadow-xs transition-colors group-hover:border-foreground/30">
                    <img
                      src={GUIDE}
                      alt="Hướng dẫn săn combo Calem.Club chỉ từ 150K mỗi món"
                      className="block h-auto w-full rounded-sm"
                    />
                  </div>
                  <p className="mt-2 font-editorial italic text-[11.5px] text-muted-foreground">
                    Hình 02 · Cách áp mã trên Shopee Mall
                  </p>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
