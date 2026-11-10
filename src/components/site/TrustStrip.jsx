import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONTACT } from '@/data/catalog';

const ITEMS = [
  {
    num: '01',
    title: 'Thử đồ tại cửa hàng',
    body: `${CONTACT.address}. Mở 9:00 – 21:00 hằng ngày — trải nghiệm trực tiếp trước khi mua.`,
  },
  {
    num: '02',
    title: 'Đổi size trong 7 ngày',
    body: 'Sản phẩm còn nguyên tag, chưa giặt hoặc qua sử dụng: hỗ trợ đổi size hoặc đổi mẫu trong 7 ngày.',
    to: '/chinh-sach-doi-tra',
  },
  {
    num: '03',
    title: 'Kênh phân phối chính thức',
    body: 'Calem.Club bán trực tiếp tại cửa hàng và gian hàng chính hãng trên Shopee Mall & TikTok Mall.',
  },
  {
    num: '04',
    title: 'Tư vấn size 1–1',
    body: `Nhắn Zalo ${CONTACT.phoneDisplay} để được đo thông số thực tế và kiểm tra tồn kho theo mẫu.`,
    href: CONTACT.zalo,
  },
];

function ColumnContent({ item }) {
  return (
    <div className="border-t border-foreground/20 pt-5 transition-colors group-hover:border-primary">
      <span className="font-editorial italic text-[13px] text-primary">{item.num}</span>
      <h3 className="mt-3 font-heading text-[15px] font-semibold text-foreground">{item.title}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{item.body}</p>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="border-t border-border bg-[#F3F1EB]/60 py-14 lg:py-20">
      <div className="shell">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-kicker">Cam kết dịch vụ</p>
            <h2 className="section-title mt-1.5">Mua sắm minh bạch tại Calem.Club</h2>
          </div>
          <Link
            to="/chinh-sach-doi-tra"
            className="group section-link"
          >
            Chính sách đổi trả
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {ITEMS.map((item) =>
            item.to ? (
              <Link key={item.title} to={item.to} className="group block">
                <ColumnContent item={item} />
              </Link>
            ) : item.href ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <ColumnContent item={item} />
              </a>
            ) : (
              <div key={item.title} className="group">
                <ColumnContent item={item} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
