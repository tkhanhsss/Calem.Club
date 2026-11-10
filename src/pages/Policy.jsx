import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { CONTACT } from '@/data/catalog';
import ReturnPolicyCard from '@/components/site/ReturnPolicyCard';

const SECTIONS = [
  {
    id: 'doi-tra',
    title: 'Chính sách đổi trả',
    intro:
      'Bạn được đổi size hoặc đổi sang mẫu khác trong 7 ngày kể từ khi nhận hàng, với điều kiện sản phẩm còn nguyên tag, chưa qua sử dụng và chưa giặt.',
    bullets: [
      'Liên hệ Zalo hoặc hotline trước khi gửi hàng về để shop giữ size bạn cần.',
      'Sản phẩm lỗi từ nhà sản xuất (đường may, phụ liệu, lỗi vải): shop đổi mới hoặc hoàn tiền.',
      'Chi phí vận chuyển đổi trả do hai bên thống nhất khi xác nhận đơn — shop báo rõ trước khi thực hiện.',
      'Sản phẩm đã qua sử dụng, mất tag hoặc đã giặt sẽ không được đổi.',
    ],
  },
  {
    id: 'giao-hang',
    title: 'Giao hàng & thanh toán',
    intro:
      'Shop gửi hàng toàn quốc sau khi chốt đơn qua Zalo hoặc hotline. Phí giao và thời gian dự kiến được shop xác nhận theo địa chỉ của bạn trước khi gửi.',
    bullets: [
      'Thanh toán khi nhận hàng (COD) hoặc chuyển khoản — shop xác nhận trong tin nhắn chốt đơn.',
      'Bạn cũng có thể đặt trực tiếp trên gian hàng Shopee chính thức với đầy đủ chính sách của sàn.',
      'Nhận hàng tại cửa hàng: thử size trực tiếp, thanh toán tại quầy.',
    ],
  },
  {
    id: 'size',
    title: 'Hướng dẫn chọn size',
    intro:
      'Mỗi mẫu có bảng size riêng theo nhà sản xuất. Để chọn đúng ngay lần đầu, hãy cho shop biết chiều cao, cân nặng và form bạn thích (vừa hoặc rộng).',
    bullets: [
      'Áo: nếu thích mặc rộng thoải mái, tăng 1 size so với size thường mặc.',
      'Quần: số size trên sản phẩm là size eo theo bảng của xưởng, không phải size quần tây.',
      'Bạn đang lưỡng lự giữa hai size? Nhắn Zalo để shop đo lại số đo thực tế của mẫu đó.',
    ],
  },
  {
    id: 'bao-quan',
    title: 'Bảo quản sản phẩm',
    intro: 'Để giữ form và màu lâu hơn, hãy chăm sóc sản phẩm theo hướng dẫn sau.',
    bullets: [
      'Giặt lạnh hoặc giặt tay, lộn trái trước khi giặt.',
      'Không dùng chất tẩy mạnh, không sấy ở nhiệt độ cao.',
      'Phơi trong bóng râm, ủi ở nhiệt độ thấp đối với cotton và len.',
    ],
  },
];

export default function Policy() {
  return (
    <div className="pt-24 lg:pt-[106px]">
      <section className="shell pb-10 pt-8">
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-foreground">Chính sách &amp; hỗ trợ</span>
        </div>
        <p className="editorial-kicker mt-6">Calem.Club</p>
        <h1 className="section-title mt-2">Chính sách &amp; hỗ trợ</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Thông tin rõ ràng trước khi mua: đổi trả, giao hàng, chọn size và bảo quản. Có gì chưa rõ, nhắn shop trực
          tiếp.
        </p>
      </section>
      <section className="shell pb-14">
        <ReturnPolicyCard />
      </section>
      <section className="shell grid gap-12 pb-16 lg:grid-cols-[1fr_1.6fr]">
        <nav className="lg:sticky lg:top-28 lg:self-start">
          <p className="editorial-kicker">Mục lục</p>
          <ul className="mt-4 space-y-3">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-[14.5px] text-foreground/75 transition-colors hover:text-foreground">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-lg border border-border bg-[#F3F1EB] p-6">
            <p className="editorial-kicker">Cần hỗ trợ trực tiếp?</p>
            <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="btn-bronze mt-4 w-full">
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.6} />
              Nhắn Zalo
            </a>
            <a href={`tel:${CONTACT.phoneRaw}`} className="mt-4 flex items-center gap-2.5 text-[13.5px] text-foreground/80 hover:text-foreground">
              <Phone className="h-4 w-4 text-primary" strokeWidth={1.6} />
              {CONTACT.phoneDisplay}
            </a>
            <p className="mt-3 flex items-start gap-2.5 text-[13.5px] leading-relaxed text-foreground/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} />
              {CONTACT.address}
            </p>
          </div>
        </nav>
        <div className="space-y-14">
          {SECTIONS.map((section, idx) => (
            <div key={section.id} id={section.id} className="scroll-mt-28 border-t border-border pt-8">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial italic text-[13px] text-muted-foreground">0{idx + 1}</span>
                <h2 className="font-heading text-[1.35rem] font-semibold tracking-[-0.015em] text-foreground">
                  {section.title}
                </h2>
              </div>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">{section.intro}</p>
              <ul className="mt-5 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-[14.5px] leading-relaxed text-foreground/80">
                    <span className="mt-2.5 h-px w-2.5 shrink-0 bg-foreground/50" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="border-t border-border pt-8 text-[13px] leading-relaxed text-muted-foreground">
            Chính sách áp dụng cho đơn hàng mua trực tiếp tại cửa hàng Calem.Club và qua Zalo/hotline. Đơn hàng đặt
            trên sàn thương mại điện tử áp dụng theo chính sách của sàn tại thời điểm đặt.
          </p>
        </div>
      </section>
    </div>
  );
}
