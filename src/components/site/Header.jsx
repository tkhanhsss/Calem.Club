import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight, MessageCircle, Search } from 'lucide-react';
import BrandMark from '@/components/site/BrandMark';
import QuickSearchModal from '@/components/site/QuickSearchModal';
import { CATEGORIES, CONTACT } from '@/data/catalog';

const NAV = [
  { label: 'Bộ sưu tập', to: '/bo-suu-tap' },
  ...CATEGORIES.map((c) => ({ label: c.name, to: `/bo-suu-tap?danh-muc=${c.slug}` })),
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          solid
            ? 'border-b border-border bg-background/95 backdrop-blur-xl shadow-xs'
            : 'border-b border-border/50 bg-background'
        }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-[#141B29] py-1.5 text-[11px] font-normal text-white/85">
          <div className="shell flex items-center justify-between">
            <span className="hidden lg:inline-block font-editorial italic text-[11.5px] text-white/75">
              Designed for daily wear
            </span>
            <span className="mx-auto text-center tracking-[0.015em] text-white/90">
              Freeship đơn từ 500K · Đổi size miễn phí 7 ngày · Mua combo giảm đến 15%
            </span>
            <div className="hidden lg:inline-flex items-center gap-3 text-white/75">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="inline-flex items-center gap-1 font-medium hover:text-white transition-colors"
              >
                <Phone className="h-3 w-3" strokeWidth={1.8} />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <span className="opacity-25">|</span>
              <a
                href={CONTACT.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-white transition-colors"
              >
                Shopee Mall
              </a>
            </div>
          </div>
        </div>

        <div className="shell flex h-16 items-center justify-between gap-3 lg:h-[72px] xl:gap-5">
          <Link to="/" className="flex shrink-0 items-center gap-2 lg:gap-2.5">
            <BrandMark className="h-9 w-9 lg:h-10 lg:w-10" />
            <span className="brand-type text-[18px] leading-none text-primary lg:text-[20px]">
              Calem.Club
            </span>
          </Link>

          <nav className="hidden items-center gap-3 lg:flex xl:gap-5 2xl:gap-6">
            {NAV.map((item) => {
              const currentUrl = location.pathname + location.search;
              const isActive =
                item.to === '/bo-suu-tap'
                  ? location.pathname === '/bo-suu-tap' && !location.search
                  : currentUrl === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`whitespace-nowrap font-heading text-[11.5px] tracking-[-0.005em] transition-colors duration-200 xl:text-[12.5px] ${
                    isActive
                      ? 'font-semibold text-primary underline underline-offset-8'
                      : 'font-medium text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-md border border-border bg-transparent px-3 font-heading text-[12px] font-medium text-foreground/80 transition-colors duration-200 hover:border-foreground/40 hover:text-foreground"
              aria-label="Tìm kiếm sản phẩm (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
              <span className="hidden xl:inline">Tìm kiếm</span>
            </button>

            <Link
              to="/bo-suu-tap"
              className="hidden h-9 shrink-0 items-center justify-center rounded-md bg-foreground px-4 font-heading text-[12px] font-medium text-background transition-colors duration-200 hover:bg-primary sm:inline-flex"
            >
              Mua ngay
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center text-primary lg:hidden"
            >
              {open ? <X className="h-6 w-6" strokeWidth={1.6} /> : <Menu className="h-6 w-6" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-background pt-24 lg:hidden">
          <div className="shell flex min-h-full flex-col justify-between pb-10 pt-6">
            <nav className="flex flex-col divide-y divide-border">
              <Link
                to="/bo-suu-tap"
                className="flex items-center justify-between py-3.5"
              >
                <span className="font-heading text-[1.15rem] font-semibold tracking-[-0.015em] text-foreground">
                  Tất cả sản phẩm
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={`/bo-suu-tap?danh-muc=${c.slug}`}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="font-heading text-[1.15rem] font-semibold tracking-[-0.015em] text-foreground">
                    {c.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
                </Link>
              ))}
              <Link
                to="/chinh-sach-doi-tra"
                className="flex items-center justify-between py-3.5"
              >
                <span className="font-heading text-[1.15rem] font-semibold tracking-[-0.015em] text-foreground">
                  Chính sách đổi trả
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              </Link>
            </nav>

            <div className="mt-8 space-y-3">
              <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="btn-solid w-full">
                <MessageCircle className="h-4 w-4" strokeWidth={1.8} /> Nhắn Zalo đặt hàng
              </a>
              <a href={`tel:${CONTACT.phoneRaw}`} className="btn-outline w-full">
                <Phone className="h-4 w-4" strokeWidth={1.8} /> Gọi {CONTACT.phoneDisplay}
              </a>
              <p className="pt-1 text-center text-[12.5px] leading-relaxed text-muted-foreground">{CONTACT.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
