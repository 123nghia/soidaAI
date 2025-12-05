# TÓM TẮT TÍNH NĂNG - ỨNG DỤNG SOI DA AI

## TỔNG QUAN
Ứng dụng web phân tích da mặt bằng AI (Soi Da AI) được xây dựng trên nền tảng Laravel 8, cung cấp các tính năng phân tích da, quản lý người dùng, lịch sử soi da, và các tính năng marketing.

---

## 1. PHÂN TÍCH DA BẰNG AI

### 1.1. Soi da cơ bản
- **Chụp ảnh và phân tích**: Người dùng upload ảnh da mặt (base64) để phân tích
- **API phân tích**: Tích hợp với API `portal.applamdep.com` để phân tích da
- **Kết quả phân tích bao gồm**:
  - Dữ liệu tổng quan (generalResult): Tuổi da, loại da, độ ẩm, độ đàn hồi...
  - Dữ liệu chi tiết (specialResult): Các vấn đề cụ thể về da
  - Dữ liệu gợi ý (hintResult): Lão hóa da, mụn viêm, quầng thâm mắt, lỗ chân lông, đốm thâm nám

### 1.2. Phân tích AI nâng cao
- **Tích hợp AI**: Sử dụng AI để phân tích và đưa ra lời khuyên chăm sóc da
- **Text-to-Speech**: Chuyển đổi kết quả phân tích thành giọng nói (FPT AI TTS)
- **Cấu hình AI**: Hỗ trợ cấu hình AI theo từng slug/chiến dịch

### 1.3. Hiển thị kết quả
- **Nhiều giao diện kết quả**: 
  - `resultZalo`: Giao diện cho Zalo
  - `resultZalo2`: Giao diện Zalo phiên bản 2
  - `resultNormal`: Giao diện thông thường
  - `resultAI`: Giao diện với AI
  - `resultXemtuong`: Giao diện xem tướng
- **Responsive**: Hỗ trợ cả desktop và mobile

---

## 2. QUẢN LÝ NGƯỜI DÙNG

### 2.1. Đăng nhập/Đăng ký
- **Đăng nhập bằng số điện thoại**: Hỗ trợ đăng nhập bằng số điện thoại
- **Đăng nhập game**: Chế độ đăng nhập riêng cho game
- **Đăng ký tài khoản**: Đăng ký với email, số điện thoại, tên đầy đủ
- **Đăng nhập Admin/Sale**: Hệ thống phân quyền cho admin và nhân viên bán hàng

### 2.2. Quản lý hồ sơ
- **Xem thông tin cá nhân**: Xem thông tin tài khoản
- **Cập nhật thông tin**: Cập nhật tên, email, địa chỉ, giới thiệu
- **Thông tin tài khoản**: Trang `/thong-tin-tai-khoan` để quản lý profile

### 2.3. Phân quyền
- **End User**: Người dùng cuối
- **Sale**: Nhân viên bán hàng (có thể thêm khách hàng)
- **Admin**: Quản trị viên

---

## 3. LỊCH SỬ SOI DA

### 3.1. Lưu trữ lịch sử
- **Lưu kết quả soi da**: Tự động lưu mỗi lần soi da
- **Thông tin lưu trữ**:
  - Ảnh da mặt
  - Kết quả phân tích (JSON)
  - IP client, vị trí địa lý
  - Thời gian soi da
  - Thông tin game (nếu có)
  - Loại kết nối (Zalo, minisize...)

### 3.2. Xem lịch sử
- **Danh sách lịch sử**: Xem tất cả lịch sử soi da của người dùng
- **Chi tiết lịch sử**: Xem chi tiết từng lần soi da
- **Lịch sử với iframe**: Xem lịch sử trong iframe để embed
- **Lịch sử theo slug**: Lọc lịch sử theo chiến dịch/slug

### 3.3. API lịch sử
- `GET /get-all-history`: Lấy tất cả lịch sử
- `POST /skin/add-history-skin-plugin`: Lưu lịch sử
- `GET /xemchitietlichsu/{id}`: Xem chi tiết lịch sử

---

## 4. HỆ THỐNG GAME & KHUYẾN MÃI

### 4.1. Game soi da
- **Game đoán tuổi da**: Người dùng đoán tuổi da để trúng thưởng
- **Cấu hình game**: 
  - Thời gian bắt đầu/kết thúc
  - Khung giờ chơi (fromtime, totime)
  - Số tuổi da trúng thưởng (skinNumber)
  - Loại game (typeGame)
- **Popup thông báo**: 
  - Popup thành công (pupupSuccess)
  - Popup thất bại (popupfail)

### 4.2. Game xem tướng
- **Tính năng xem tướng**: Phân tích tướng mặt
- **Cấu hình riêng**: Có cấu hình riêng cho game xem tướng

### 4.3. Game minisize
- **Game minisize**: Tính năng game mini
- **Hiển thị/Ẩn**: Có thể bật/tắt hiển thị

### 4.4. Chương trình khuyến mãi
- **Form nhận quà**: Trang `/tham-gia-chuong-trinh-qua-tang`
- **Tracking click**: Theo dõi click vào Zalo, minisize
- **Phân phối load**: Round-robin distribution

---

## 5. HỆ THỐNG ĐẶT LỊCH (BOOKING)

### 5.1. Đặt lịch
- **Trang đặt lịch**: `/book` và `/book/{book}`
- **Giao diện booking**: Hỗ trợ cả mobile và desktop
- **Kết quả booking**: Trang `/book/{book}/ket-qua`

### 5.2. Tích hợp với soi da
- **Booking sau khi soi da**: Có thể đặt lịch sau khi xem kết quả soi da

---

## 6. ĐỀ XUẤT SẢN PHẨM

### 6.1. Gợi ý sản phẩm
- **Trang đề xuất**: `/nhan-de-xuat-cham-soc-da`
- **Dựa trên kết quả soi da**: Đề xuất sản phẩm phù hợp với tình trạng da

---

## 7. HỆ THỐNG MULTI-TENANT (NHIỀU CHIẾN DỊCH)

### 7.1. Slug-based routing
- **Hỗ trợ nhiều slug**: Mỗi chiến dịch có slug riêng
- **Kiểm tra quyền truy cập**: API kiểm tra slug có hợp lệ không
- **Cấu hình theo slug**: Mỗi slug có cấu hình riêng (màu sắc, banner, game...)

### 7.2. Cấu hình theo công ty
- **Company ID**: Mỗi slug liên kết với một company_id
- **Cấu hình màu sắc**: Hệ thống màu riêng cho từng công ty
- **Banner**: Banner riêng cho từng chiến dịch
- **Footer**: Footer có thể tùy chỉnh

---

## 8. TÍCH HỢP BÊN THỨ BA

### 8.1. FPT AI Text-to-Speech
- **Chuyển đổi giọng nói**: Chuyển kết quả phân tích thành audio
- **Giọng nói**: Sử dụng giọng "banmai"
- **API Key**: Tích hợp với FPT AI TTS API

### 8.2. Zalo Integration
- **Tracking click Zalo**: Theo dõi click vào Zalo
- **Kết nối Zalo**: Hỗ trợ kết nối với Zalo OA

### 8.3. IP Geolocation
- **Xác định vị trí**: Sử dụng ip-api.com để xác định vị trí người dùng
- **Lưu thông tin địa lý**: Lưu regionName, dataCheckRegion

---

## 9. GIAO DIỆN & UX

### 9.1. Responsive Design
- **Mobile & Desktop**: Hỗ trợ cả mobile và desktop
- **Device Detection**: Sử dụng Jenssegers Agent để phát hiện thiết bị
- **Giao diện riêng**: Có giao diện riêng cho mobile và desktop

### 9.2. Nhiều theme
- **welcomeZalo**: Giao diện cho Zalo
- **welcomeZalo2**: Giao diện Zalo v2
- **welcomeNormal**: Giao diện thông thường
- **xemtuong**: Giao diện xem tướng

### 9.3. Banner & Marketing
- **Banner động**: Hỗ trợ banner GIF, video
- **Banner theo chiến dịch**: Banner riêng cho từng slug
- **Hero banner**: Video banner trên trang chủ

---

## 10. API & BACKEND

### 10.1. API Endpoints
- **Soi da**: `POST /skin/call-soi-da`
- **Lưu lịch sử**: `POST /skin/add-history-skin-plugin`
- **Lấy lịch sử**: `GET /get-all-history`
- **Đăng nhập**: `POST /dang-nhap-plugin`
- **Cập nhật profile**: `POST /update-end-user`
- **Thêm khách hàng (Sale)**: `POST /them-moi-khach-hang`

### 10.2. External APIs
- **API Soi Da**: `https://portal.applamdep.com/api/skin/portalApp`
- **API Backend**: `https://api-soida.applamdep.com`
- **FPT AI TTS**: `https://api.fpt.ai/hmi/tts/v5`
- **IP Geolocation**: `http://ip-api.com/json/`

---

## 11. BẢO MẬT & XÁC THỰC

### 11.1. Session Management
- **Session-based auth**: Sử dụng Laravel session
- **Token-based API**: Sử dụng Bearer token cho API
- **Logout**: Hỗ trợ logout cho user, sale, admin

### 11.2. Validation
- **Kiểm tra slug**: Validate slug trước khi truy cập
- **Kiểm tra quyền**: Phân quyền theo loại user

---

## 12. CACHE & PERFORMANCE

### 12.1. Caching
- **Cache webinfo**: Cache thông tin website
- **Cache dataColor**: Cache màu sắc hệ thống
- **Cache footer**: Cache footer data

### 12.2. Optimization
- **Lazy loading**: Load dữ liệu khi cần
- **Session storage**: Lưu dữ liệu trong session để giảm API calls

---

## 13. LOGGING & TRACKING

### 13.1. Tracking
- **Click tracking**: Theo dõi click vào Zalo, minisize
- **Connection type**: Lưu loại kết nối (Zalo, web...)
- **Time connection**: Thời gian kết nối

### 13.2. Analytics
- **History tracking**: Lưu tất cả lịch sử soi da
- **Game tracking**: Theo dõi tham gia game
- **User behavior**: Lưu thông tin hành vi người dùng

---

## 14. TÍNH NĂNG ĐẶC BIỆT

### 14.1. Tư vấn (TuVan)
- **Tính năng tư vấn**: Có module tư vấn riêng
- **Cấu hình theo slug**: Tư vấn có thể cấu hình theo slug

### 14.2. Beauty Game
- **Game làm đẹp**: Tính năng game làm đẹp
- **Cấu hình riêng**: Có cấu hình riêng cho beauty game

### 14.3. Evoucher
- **Banner evoucher**: API lấy banner evoucher
- **Footer evoucher**: Footer cho evoucher

---

## 15. HỆ THỐNG PHÂN PHỐI

### 15.1. Round-Robin Distribution
- **Phân phối tải**: Sử dụng round-robin để phân phối tải
- **API**: `https://api-soida.applamdep.com/api/distribution/getRoudRobin`

---

## TÓM TẮT CÁC TÍNH NĂNG CHÍNH

1. ✅ **Phân tích da bằng AI** - Soi da, phân tích tình trạng da
2. ✅ **Quản lý người dùng** - Đăng nhập, đăng ký, quản lý profile
3. ✅ **Lịch sử soi da** - Lưu và xem lịch sử
4. ✅ **Game & Khuyến mãi** - Game đoán tuổi da, xem tướng
5. ✅ **Đặt lịch** - Hệ thống booking
6. ✅ **Đề xuất sản phẩm** - Gợi ý sản phẩm chăm sóc da
7. ✅ **Multi-tenant** - Hỗ trợ nhiều chiến dịch/slug
8. ✅ **Tích hợp Zalo** - Kết nối với Zalo OA
9. ✅ **Text-to-Speech** - Chuyển kết quả thành giọng nói
10. ✅ **Responsive Design** - Hỗ trợ mobile & desktop
11. ✅ **Tracking & Analytics** - Theo dõi hành vi người dùng
12. ✅ **Banner & Marketing** - Quản lý banner, chiến dịch

---

## CÔNG NGHỆ SỬ DỤNG

- **Framework**: Laravel 8
- **Frontend**: HTML, CSS, JavaScript, jQuery, Slick
- **APIs**: Guzzle HTTP Client
- **Image Processing**: Intervention Image
- **Device Detection**: Jenssegers Agent
- **Text-to-Speech**: FPT AI
- **Caching**: Laravel Cache

