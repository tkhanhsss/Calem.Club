import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

export default function FloatingSupport() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/san-pham/');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showScrollTop) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      className={`fixed right-5 z-40 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/95 text-foreground/80 shadow-sm backdrop-blur-xs transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background sm:right-7 ${
        isProductPage ? 'bottom-24' : 'bottom-6'
      }`}
    >
      <ChevronUp className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
