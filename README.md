# Mô tả ứng dụng
- Tên ứng dụng: "Find&Post User Cover Photo to Page's Wall".
- Loại ứng dụng: Ứng dụng web (web application).
- Backend: NodeJS, ExpressJS
  - Worker: Chromium, PuppeteerJS
- Frontend: index.html

# Chức năng
- Crawl URL ảnh bìa của người dùng Facebook dựa vào user ID (UID) hoặc username của họ. Ví dụ của 1 người dùng: `100030260986154` hoặc `ngochuy1410`, vậy thì ứng dụng sẽ crawl ở địa chỉ: `https://facebook.com/<UID|username>`.
- Gửi ảnh đó tới album ảnh của Facebook Page mà mình quản lý, đồng thời post lên timeline bằng Facebook Graph API.
- Cung cấp giao diện để cấu hình cách tool chạy: 
    - Danh sách UID
    - Thời gian dừng giữa các task
    - Thời gian dừng trong ngày
    - Danh sách UID để mở random trong lúc chạy
    - Số chu kỳ (task) để thực hiện mở 1 random UID trong danh sách random đó.
- Có thể theo dõi tiến trình của ứng dụng thông qua cửa sổ `cmd.exe` chứa thông điệp của backend (server) và cửa sổ console của trình duyệt (mở bằng tổ hợp phím `Ctrl + Shift + J`); đồng thời giao diện của ứng dụng cũng có thanh tiến độ (progress bar) ở bên trên nút "Bắt đầu" giúp nhanh chóng theo dõi tiến độ của ứng dụng.

# Hướng dẫn cài đặt
- Đảm bảo máy tính đã cài đặt NodeJS. 
  - Để kiểm tra xem máy tính đã cài đặt NodeJS hay chưa:
     - Với máy Windows: Mở `cmd.exe` và gõ lệnh `node --version`. Nếu hiện thị ra 1 dòng như `v12.18.3` thì máy tính đã cài NodeJS phiên bản v12.18.3 OK hết rồi.
  - Nếu không ra như trên vậy hãy cài đặt NodeJS:
     - Truy cập [trang chủ của NodeJS](https://nodejs.org/en/), sau đó ấn vào nút xanh lục có dòng chữ "Recommended For Most Users" để tải về.
     - Tải xong thì mở ra và cài đặt bình thường. Nếu không rành chỉ cần click Next tới hết là OK rồi.
     - Kiểm tra phiên bản NodeJS trong máy tính như ở trên. **Lưu ý** là cần phải mở cửa sổ `cmd.exe` mới thì mới có hiệu lực.
- Nhấp đúp chuột vào file `start_here.bat` để nhanh chóng sử dụng ứng dụng. **Lưu ý** không được đóng cửa sổ `cmd.exe` vừa mở lên vì nó giúp duy trì ứng dụng chạy được. Các thông điệp được in ra cửa sổ `cmd.exe` đó là thông điệp của backend (server), có thể giúp ta theo dõi tiến độ của ứng dụng.

# Hướng dẫn sử dụng:
- Sau khi truy cập vào ứng dụng, sẽ có cửa sổ trình duyệt nhỏ mở lên yêu cầu đăng nhập vào Facebook. Hãy đăng nhập bằng *tài khoản đã là admin của app Facebook [Pages Manager](https://developers.facebook.com/apps/201557361779080/roles/roles/)*.
- Nhập vào Page ID của Page mà bạn muốn gửi ảnh tới.
  - Để tìm Page ID, truy cập Page mà bạn quản lý, sau đó tìm tới phần `About`. Tìm ở bên dưới sẽ có trường `Page ID`, bạn dán ID đó vào trường `Page ID` của ứng dụng.
- Nhập vào danh sách các user ID (UID) hoặc username mà bạn cần crawl, mỗi UID/username cách nhau bởi 1 dấu xuống dòng (`\n`).
- Nhập vào các tùy chọn khác nếu muốn.
- Nhấn nút "Bắt đầu" thì ứng dụng sẽ crawl từng user lấy URL ảnh bìa, sau đó post nó lên Page, sau đó sẽ là thời gian chờ giữa các task, sau đó lại tiếp tục chạy như vậy cho tới khi hết, hoặc tới thời điểm dừng hoạt động như đã lựa chọn, hoặc người dùng nhấn nút "Hủy".
