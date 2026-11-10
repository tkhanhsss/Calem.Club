import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getSizeChartForProduct } from '@/data/sizeCharts';

export default function SizeChartModal({ product, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const chart = getSizeChartForProduct(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-8 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="editorial-kicker">Thông số đo tham khảo</p>
            <h3 className="mt-1 font-heading text-[18px] font-semibold tracking-[-0.015em] text-foreground">
              {chart.title}
            </h3>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Áp dụng cho: <span className="font-medium text-foreground">{product.name}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-[#F3F1EB] hover:text-foreground"
            aria-label="Đóng bảng size"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Size Table */}
        <div className="mt-5 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-[13px] tabular-nums">
            <thead className="border-b border-border bg-[#F3F1EB] text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                {chart.headers.map((h, i) => (
                  <th key={h} className={`px-4 py-3 ${i === 0 ? 'text-primary' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {chart.rows.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-[#F3F1EB]/50">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`whitespace-nowrap px-4 py-3.5 ${
                        cellIdx === 0 ? 'font-heading font-semibold text-foreground' : 'text-foreground/80'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sizing Note / Advice */}
        <div className="mt-5 border-l-2 border-foreground bg-[#F3F1EB] px-4 py-3 text-[12.5px] leading-relaxed text-foreground/80">
          <p>
            <strong className="font-semibold text-foreground">Lưu ý từ Calem.Club:</strong> {chart.fitNote} Nếu bạn cần tư vấn số đo chuẩn xác hơn theo dáng người, hãy nhắn cho shop qua Zalo.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-solid !px-6 !py-2.5 text-[12px]"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
}
