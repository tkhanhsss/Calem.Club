import { Link } from 'react-router-dom';
import { Instagram, Music2, ShoppingBag, MapPin, Phone } from 'lucide-react';
import BrandMark from '@/components/site/BrandMark';
import { CATEGORIES, CONTACT } from '@/data/catalog';

const SOCIAL = [
  { href: CONTACT.tiktok, label: 'TikTok Calem.Club', Icon: Music2 },
  { href: CONTACT.instagram, label: 'Instagram Calem.Club', Icon: Instagram },
  { href: CONTACT.shopee, label: 'Gian hàng Shopee Calem.Club', Icon: ShoppingBag },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#F3F1EB]">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <span className="brand-type text-[20px] leading-none text-primary">Calem.Club</span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              Local brand streetwear Việt Nam: polo, áo thun, áo len, sơ mi, áo khoác, quần và phụ kiện cho cả nam
              và nữ.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/70 text-foreground/80 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="editorial-kicker">Danh mục</p>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/bo-suu-tap?danh-muc=${c.slug}`}
                    className="text-[14px] text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="editorial-kicker">Hỗ trợ</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: 'Chính sách đổi trả', to: '/chinh-sach-doi-tra' },
                { label: 'Giao hàng & thanh toán', to: '/chinh-sach-doi-tra#giao-hang' },
                { label: 'Hướng dẫn chọn size', to: '/chinh-sach-doi-tra#size' },
                { label: 'Bảo quản sản phẩm', to: '/chinh-sach-doi-tra#bao-quan' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[14px] text-foreground/75 transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="editorial-kicker">Cửa hàng &amp; Liên hệ</p>
            <ul className="mt-4 space-y-3.5 text-[14px] text-foreground/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.7} />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.7} />
                <a href={`tel:${CONTACT.phoneRaw}`} className="tabular-nums transition-colors hover:text-foreground">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[12.5px] leading-relaxed text-muted-foreground">{CONTACT.hours}</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} Calem.Club · Designed for daily wear.
          </p>
          <p className="text-[12.5px] text-muted-foreground">
            Phân phối chính hãng tại cửa hàng Calem.Club và gian hàng chính thức trên Shopee Mall &amp; TikTok Mall.
          </p>
        </div>
      </div>
    </footer>
  );
}
