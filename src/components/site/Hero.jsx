import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT } from '@/data/catalog';
import heroBanner from '@/assets/fall-winter-collection.png';
import jeansPlusSizes from '@/assets/jeans-plus-sizes.jpg';
import fashionChallenge from '@/assets/fashion-styling-challenge.png';

const ease = [0.22, 1, 0.36, 1];

const SLIDES = [
  {
    id: 'fall-winter',
    eyebrow: 'Bộ sưu tập Thu Đông',
    title: (
      <>
        Fall / Winter
        <br />
        Collection
      </>
    ),
    subtitle: 'Limited Edition',
    description: (
      <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
        Be the trendsetter, not the follower — khám phá những thiết kế mới nhất với số lượng giới hạn từ Calem.Club.
      </p>
    ),
    image: heroBanner,
    imageAlt: 'Fall/Winter Collection – Limited Edition Calem.Club',
    primaryBtn: { text: 'Khám phá ngay', link: '/bo-suu-tap' },
    secondaryBtn: { text: 'Săn Deal Shock', link: '/bo-suu-tap?danh-muc=deal-shock' },
  },
  {
    id: 'jeans-plus-sizes',
    eyebrow: 'Denim Collection · XXL & XXXL',
    title: (
      <>
        Calem.Club Jeans
        <br />
        Now in Plus Sizes
      </>
    ),
    subtitle: 'Không giới hạn vóc dáng',
    description: (
      <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
        Dòng quần jeans ống suông và short jean nay đã mở rộng đủ size đến XXL và XXXL, giữ nguyên phom đứng và cảm giác thoải mái hằng ngày.
      </p>
    ),
    image: jeansPlusSizes,
    imageAlt: 'Calem.Club jeans now come in plus sizes',
    primaryBtn: { text: 'Xem dòng Jeans', link: '/bo-suu-tap?danh-muc=jeans' },
    secondaryBtn: null,
  },
  {
    id: 'fashion-styling-challenge',
    eyebrow: 'Cộng đồng Calem.Club',
    title: (
      <>
        Fashion Styling
        <br />
        Challenge
      </>
    ),
    subtitle: 'Mix More, Save More',
    description: (
      <div className="max-w-lg space-y-2.5 xl:space-y-3.5">
        <p className="text-[13.5px] xl:text-[14.5px] leading-relaxed text-muted-foreground">
          Biến hóa trang phục Calem.Club theo phong cách riêng từ giảng đường, công sở đến những buổi dạo phố cuối tuần.
        </p>
        <div className="border-l-2 border-primary pl-3.5 py-0.5 text-[13px] xl:text-[13.5px] leading-relaxed text-foreground/85">
          <span className="font-semibold text-primary">Giải thưởng:</span> Áo khoác Peacoat Ver. 2 thuộc Knit Season Collection cùng voucher mua sắm trị giá đến 500.000₫.
        </div>
      </div>
    ),
    image: fashionChallenge,
    imageAlt: 'Fashion Styling Challenge – Mix More, Save More Calem.Club',
    isPortraitPoster: true,
    primaryBtn: { text: 'Tham gia qua TikTok', externalHref: CONTACT.tiktok },
    secondaryBtn: null,
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.28,
      ease,
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -24 : 24,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease,
    },
  }),
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = SLIDES.length - 1;
      else if (next >= SLIDES.length) next = 0;
      return next;
    });
  }, []);

  const goToSlide = useCallback(
    (idx) => {
      if (idx === currentIndex) return;
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) paginate(1);
    if (distance < -50) paginate(-1);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      className="relative overflow-hidden bg-background pt-24 lg:pt-[106px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="shell py-6 sm:py-8 lg:py-9">
        <div className="grid gap-8 lg:grid-cols-[480px_1fr] xl:grid-cols-[540px_1fr] lg:items-stretch lg:gap-10 xl:gap-16">
          {/* Cột trái: Khung ảnh lookbook cố định kích thước giữa các slide */}
          <div className="relative order-2 lg:order-1">
            <div
              data-hero-frame
              className="relative mx-auto aspect-square w-full max-w-[480px] xl:max-w-[540px] overflow-hidden rounded-md bg-[#F3F1EB] lg:mx-0"
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    loading="eager"
                    className={
                      currentSlide.isPortraitPoster
                        ? 'h-full w-full object-contain p-3'
                        : 'h-full w-full object-cover'
                    }
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Cột phải: Nội dung căn giữa vùng trên & thanh điều khiển neo cố định ngang đáy ảnh banner */}
          <div className="order-1 lg:order-2 flex flex-col justify-between lg:min-h-[480px] xl:min-h-[540px]">
            <div className="flex flex-1 flex-col justify-center lg:pb-4 xl:pb-6">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-editorial italic text-[13px] text-muted-foreground tabular-nums">
                      0{currentIndex + 1} / 0{SLIDES.length}
                    </span>
                    <span className="h-px w-6 bg-border" aria-hidden="true" />
                    <p className="font-heading text-[12px] font-medium text-primary">
                      {currentSlide.eyebrow}
                    </p>
                  </div>

                  <h1 className="mt-3.5 font-heading text-[2.1rem] sm:text-[2.6rem] lg:text-[2.45rem] xl:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.06] text-foreground">
                    {currentSlide.title}
                  </h1>

                  {currentSlide.subtitle && (
                    <p className="mt-2 font-editorial italic text-[1.15rem] sm:text-[1.35rem] text-primary">
                      {currentSlide.subtitle}
                    </p>
                  )}

                  <div className="mt-3.5">{currentSlide.description}</div>

                  {currentSlide.primaryBtn && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {currentSlide.primaryBtn.externalHref ? (
                        <a
                          href={currentSlide.primaryBtn.externalHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-solid"
                        >
                          {currentSlide.primaryBtn.text}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                      ) : (
                        <Link to={currentSlide.primaryBtn.link} className="btn-solid">
                          {currentSlide.primaryBtn.text}
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </Link>
                      )}
                      {currentSlide.secondaryBtn && (
                        <Link to={currentSlide.secondaryBtn.link} className="btn-outline">
                          {currentSlide.secondaryBtn.text}
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Editorial Slide Switcher & Contact */}
            <div data-hero-controls className="mt-8 lg:mt-auto shrink-0 space-y-3.5 border-t border-border pt-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToSlide(idx)}
                      aria-label={`Xem slide ${idx + 1}`}
                      className={`pb-1 font-heading text-[11.5px] tracking-[0.14em] transition-all border-b-2 tabular-nums ${
                        idx === currentIndex
                          ? 'border-foreground font-semibold text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => paginate(-1)}
                    aria-label="Trang trước"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground/75 transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={() => paginate(1)}
                    aria-label="Trang tiếp theo"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground/75 transition-colors hover:border-foreground hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] xl:text-[12px] xl:gap-x-5 text-muted-foreground">
                <a href={`tel:${CONTACT.phoneRaw}`} className="hover:text-foreground transition-colors tabular-nums">
                  Hotline {CONTACT.phoneDisplay}
                </a>
                <span className="h-3 w-px bg-border" aria-hidden="true" />
                <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  TikTok @calem.club
                </a>
                <span className="h-3 w-px bg-border" aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
