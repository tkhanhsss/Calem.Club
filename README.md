# Calem.Club — Hướng Dẫn Chạy Trang Web Trên Máy Cá Nhân

Tài liệu này viết theo từng bước đơn giản nhất dành cho người **chưa từng dùng code hoặc dòng lệnh (Terminal)**. Bạn chỉ cần làm theo đúng thứ tự là mở xem và kiểm tra được trang web ngay trên máy của mình.

---

## Phần 1: Chuẩn bị (Chỉ làm 1 lần đầu tiên)

### Bước 1: Cài đặt Node.js
Node.js là công cụ giúp máy tính hiểu và chạy được mã nguồn của trang web.

1. Truy cập trang chủ chính thức: [https://nodejs.org](https://nodejs.org)
2. Tải phiên bản **LTS** (nút màu xanh có chữ *Recommended For Most Users*).
3. Mở file vừa tải về, bấm **Next → Next → Install → Finish** cho đến khi cài xong.

### Bước 2: Mở cửa sổ dòng lệnh đúng thư mục dự án
1. Mở thư mục chứa code `Calem.Club` trên máy tính của bạn.
2. **Trên Windows:**
   - Nhấn chuột vào **thanh địa chỉ** ở phía trên cùng của cửa sổ thư mục (chỗ hiển thị đường dẫn như `Desktop > Calem.Club`).
   - Gõ chữ `cmd` rồi nhấn phím **Enter**. Một cửa sổ nền đen (Command Prompt) sẽ mở ra đúng ngay thư mục dự án.
3. **Trên macOS:**
   - Mở ứng dụng **Terminal**, gõ chữ `cd ` (có một dấu cách ở cuối), kéo thả thư mục `Calem.Club` từ Finder vào cửa sổ Terminal rồi nhấn **Enter**.

---

## Phần 2: Tải thư viện & Bật trang web để xem (Cách nhanh nhất)

> 💡 **Gợi ý:** Nếu bạn chỉ muốn **xem giao diện web, lướt sản phẩm, kiểm tra hình ảnh** trên máy cá nhân, hãy chạy theo 2 lệnh dưới đây — nhanh và nhẹ nhất.

### Bước 1: Tải thư viện (chỉ cần chạy lần đầu sau khi tải code về)
Trong cửa sổ nền đen vừa mở, gõ lệnh sau rồi nhấn **Enter**:

```bash
npm install
```

Chờ khoảng **1–2 phút** cho máy tự tải thư viện. Khi thấy dấu nhắc lệnh dừng lại (cho phép gõ tiếp) và không có dòng chữ `ERR!` màu đỏ là đã xong.

### Bước 2: Khởi động trang web
Tiếp tục gõ lệnh sau rồi nhấn **Enter**:

```bash
npm run dev
```

Chờ vài giây, màn hình sẽ hiện ra dòng tương tự như sau:

```text
VITE ready in 600 ms
➜  Local:   http://localhost:5173/
```

👉 **Mở trình duyệt (Chrome, Edge, Safari...)** và gõ đúng địa chỉ hiện ở dòng **`Local:`** vào thanh địa chỉ web (ví dụ `http://localhost:5173/` hoặc `http://localhost:5174/` nếu cổng 5173 đang bận). Trang web **Calem.Club** sẽ hiện ra đầy đủ để bạn xem và bấm thử mọi chức năng.

### Cách tắt trang web khi xem xong
- Bấm vào cửa sổ nền đen đang chạy, nhấn tổ hợp phím **`Ctrl + C`** (trên Windows/macOS). Nếu máy hỏi `Terminate batch job (Y/N)?` thì gõ `Y` rồi nhấn **Enter**.
- Những lần sau muốn mở lại trang web, bạn chỉ cần mở cửa sổ dòng lệnh tại thư mục dự án và chạy mỗi lệnh **`npm run dev`** là được (không cần `npm install` lại).

---

## Phần 3: Chế độ chạy đầy đủ cùng Backend Base44 (Nâng cao)

Nếu bạn cần chạy thử phần **Backend / Đăng nhập / Cơ sở dữ liệu Base44** hoặc đồng bộ xuất bản lên hệ thống Base44:

### Cài đặt thêm (1 lần đầu)
1. Cài đặt **Deno** tại [https://docs.deno.com/runtime/getting_started/installation/](https://docs.deno.com/runtime/getting_started/installation/) (backend Base44 cục bộ cần Deno để chạy).
2. Cài đặt công cụ dòng lệnh **Base44 CLI**:
   ```bash
   npm install -g base44@latest
   ```

### Chạy cùng Base44
Từ thư mục gốc của dự án, chạy lần lượt 3 lệnh:

```bash
base44 login   # Đăng nhập tài khoản Base44 (làm 1 lần mỗi máy)
base44 link    # Liên kết thư mục code với ứng dụng trên Base44 (làm 1 lần mỗi bản clone)
base44 dev     # Tự động bật cả Backend lẫn Frontend cùng lúc
```

Sau đó mở đường dẫn mà lệnh `base44 dev` in ra (thường là `http://localhost:5173`).

> ⚠️ **Lưu ý quan trọng khi dùng Base44 CLI:**
> - **Mỗi bản clone mới đều cần chạy `base44 link`** để tạo file cấu hình cục bộ `base44/.app.jsonc`. Bạn có thể xem App ID ngay trên đường dẫn trang quản trị Base44 (`app.base44.com/apps/<id>/...`).
> - **`base44 dev` đã tự bật sẵn giao diện web cho bạn** (dựa trên `site.serveCommand` trong `base44/config.jsonc`), vì vậy **không cần** chạy thêm `npm run dev` song song.
> - **Ứng dụng cần được Publish ít nhất 1 lần trên Base44** trước khi chạy `base44 dev` để phần giao diện đọc được cấu hình khởi động.
> - Nếu chỉ sửa giao diện và muốn kết nối trực tiếp vào **dữ liệu thật trên server**, chạy `base44 dev --remote` (lưu ý: mọi thao tác ghi dữ liệu sẽ ảnh hưởng thẳng lên dữ liệu thật).

### Xuất bản thay đổi lên Web thật (Publish)
Dự án này đồng bộ với Base44 qua Git. Sau khi đẩy code mới lên Git, mở trang quản trị Base44 và bấm **Publish** trên giao diện web:

```bash
base44 dashboard open
```

*(Tránh chạy `base44 deploy` trực tiếp vì có thể làm trạng thái bản deploy bị lệch với mã nguồn trên Git.)*

---

## Phần 4: Một số lệnh & vị trí file hữu ích

| Lệnh | Tác dụng |
| :--- | :--- |
| `npm run dev` | Bật trang web xem thử trên máy cá nhân |
| `npm run lint` | Kiểm tra xem code có lỗi chính tả hay cú pháp không |
| `npm run build` | Đóng gói trang web thành file tĩnh trong thư mục `dist/` |

**Nếu muốn tự thay đổi nội dung cơ bản:**
- **Danh sách sản phẩm, giá tiền, màu sắc, mô tả, thông tin liên hệ Zalo/Hotline/Địa chỉ:** sửa trong file `src/data/catalog.js`.
- **Ảnh sản phẩm:** đặt trong thư mục `src/assets/products/`.
- **Bảng thông số size:** sửa trong file `src/data/sizeCharts.js`.

---

## Phần 5: Gặp lỗi thường gặp & Cách xử lý nhanh

1. **Báo lỗi `'npm' is not recognized as an internal or external command`:**
   - Máy chưa cài **Node.js**, hoặc bạn cài Node.js sau khi đã mở sẵn cửa sổ `cmd` / Terminal.
   - **Cách sửa:** Tắt hẳn cửa sổ `cmd` / Terminal hiện tại, mở lại cửa sổ mới (hoặc cài lại Node.js ở Bước 1) rồi thử lại.
2. **Mở `http://localhost:5173` không thấy gì / Báo cổng đã được dùng (`Port 5173 is in use`):**
   - Có thể một chương trình khác đang chiếm cổng `5173`, nên web tự chuyển sang cổng kế tiếp (như `5174` hoặc `5175`).
   - **Cách sửa:** Nhìn kỹ dòng `Local: http://localhost:xxxx/` in trong cửa sổ đen và gõ đúng số cổng đó vào trình duyệt.
3. **Web hiện lỗi hoặc trắng trang khi mới sửa code:**
   - Chạy thử `npm run lint` hoặc `npm run build` trong cửa sổ dòng lệnh để xem dòng nào đang bị lỗi cú pháp và chỉnh lại.

---

## Tài liệu tham khảo thêm (Base44)
- CLI Reference: [https://docs.base44.com/developers/references/cli/commands/introduction](https://docs.base44.com/developers/references/cli/commands/introduction)
- Tích hợp GitHub: [https://docs.base44.com/developers/app-code/local-development/github](https://docs.base44.com/developers/app-code/local-development/github)
- Phát triển Local: [https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview](https://docs.base44.com/developers/backend/overview/local-dev/local-development-overview)
- Hỗ trợ Base44: [https://app.base44.com/support](https://app.base44.com/support)
