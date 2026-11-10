const CONDITIONS = [
  {
    code: '01',
    tag: 'Lỗi sản xuất',
    text: (
      <>
        Sản phẩm <strong className="font-semibold text-foreground">lỗi, dơ</strong> do phía nhà sản xuất hoặc giao{' '}
        <strong className="font-semibold text-foreground">không đúng</strong> sản phẩm, size.
      </>
    ),
  },
  {
    code: '02',
    tag: 'Nguyên trạng',
    text: (
      <>
        Sản phẩm còn <strong className="font-semibold text-foreground">mới 100%</strong>,{' '}
        <strong className="font-semibold text-foreground">chưa</strong> qua giặt tẩy, sử dụng. Quần Jeans{' '}
        <strong className="font-semibold text-foreground">chưa</strong> cắt khuy.
      </>
    ),
  },
  {
    code: '03',
    tag: 'Giá trị đổi',
    text: (
      <>
        Áp dụng đổi <strong className="font-semibold text-foreground">size, màu</strong> với các sản phẩm{' '}
        <strong className="font-semibold text-foreground">cùng</strong> hoặc{' '}
        <strong className="font-semibold text-foreground">khác</strong> mã có giá trị{' '}
        <strong className="font-semibold text-foreground">bằng</strong> hoặc{' '}
        <strong className="font-semibold text-foreground">cao</strong> hơn sản phẩm đã mua.
      </>
    ),
  },
];

export default function ReturnPolicyCard() {
  return (
    <div className="rounded-lg border border-border bg-[#F3F1EB] p-6 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:border-r lg:border-border lg:pr-10">
          <p className="editorial-kicker">Cam kết sau bán hàng</p>
          <h2 className="mt-2 font-heading text-[1.4rem] font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
            Chính sách hỗ trợ đổi trả
          </h2>
          <div className="mt-6 flex items-baseline gap-3.5 border-t border-border pt-6">
            <span className="font-heading text-[3.2rem] font-semibold leading-none tracking-[-0.03em] text-primary tabular-nums">
              07
            </span>
            <div>
              <p className="font-heading text-[14px] font-semibold text-foreground">
                Ngày hỗ trợ đổi size
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                Tính từ thời điểm bạn nhận được bưu kiện trên toàn quốc.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-heading text-[12px] font-semibold text-muted-foreground">
            Điều kiện áp dụng
          </p>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {CONDITIONS.map((item) => (
              <li key={item.code} className="grid gap-2 py-4 sm:grid-cols-[152px_1fr] sm:gap-6">
                <div className="flex items-baseline gap-2.5 whitespace-nowrap">
                  <span className="font-editorial italic text-[13px] text-primary">{item.code}</span>
                  <span className="font-heading text-[12.5px] font-semibold text-foreground">
                    {item.tag}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-foreground/80">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
