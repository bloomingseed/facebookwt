# Hướng dẫn cài đặt
1. Cài đặt NodeJS: Mở cửa sổ cmd và gõ lệnh `node --version`. 
    - Nếu hiện thị ra 1 dòng như `v12.18.3` là được. 
    - Nếu không cần phải cài đặt [NodeJS](https://nodejs.org/en/) trước. (Sau khi cài mới phải bật lại cửa sổ cmd khác).
2. Cài đặt các dependencies: 
    - Nhấp đúp chuột vào file `install.bat` để nhanh chóng cài đặt các thành phần liên quan.
3. Nhanh chóng sử dụng ứng dụng: Nhấp đúp chuột vào file `start_here.bat`. (không được đóng cửa sổ `cmd.exe` vừa mở lên).
`
# Hướng dẫn sử dụng:
1. Đăng nhập Facebook: Sau khi truy cập vào ứng dụng, sẽ có cửa sổ trình duyệt nhỏ mở lên yêu cầu đăng nhập vào Facebook. Hãy đăng nhập bằng *tài khoản đã là admin của app [Pages Manager](https://developers.facebook.com/apps/201557361779080/roles/roles/) trên Facebook* (Hủy chặn pop-up nếu giao diện đăng nhập Facebook bị chặn). Sau đó chọn 1 page cần gửi ảnh và xác nhận các permission.
2. Nhập vào Page ID của Page cần gửi ảnh tới.
    - Để tìm Page ID, truy cập Page đó --> sau đó tìm tới phần `About`. Tìm ở bên dưới sẽ có trường `Page ID`.
3. Nhập vào danh sách các user ID (UID) hoặc username mà bạn cần crawl, mỗi UID/username cách nhau bởi 1 dấu xuống dòng (phím Enter).
3.1. Nhập vào các tùy chọn khác nếu muốn.
4. Nhấn nút "Bắt đầu" thì ứng dụng sẽ crawl từng user lấy URL ảnh bìa, sau đó post nó lên Page, sau đó sẽ là thời gian chờ giữa các task, sau đó lại tiếp tục chạy như vậy cho tới khi hết, hoặc tới thời điểm dừng hoạt động như đã lựa chọn, hoặc người dùng nhấn nút "Hủy".

# Notes:
- Cách random UID: cứ sau khi thực hiện xong số task được config thì tự động mở 1 UID trong danh sách random UID, sau đó xóa UID đó khỏi danh sách random.
- Nên sử dụng username thay vì UID vì lý do bảo mật của Facebook. E.g. nhập `letranduc.dut` thay vì `1093610843`.