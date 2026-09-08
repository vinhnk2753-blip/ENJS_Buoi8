# Library API

CRUD API cho ứng dụng quản lý thư viện sách, xây dựng bằng Express và MongoDB Node.js Driver.

## Cài đặt

```bash
npm install
cp .env.example .env   # rồi điền MONGODB_URI thật vào .env
npm start
```

## Backend API chạy ở port nào?

Mặc định backend chạy tại **`http://localhost:3000`** (cấu hình qua biến `PORT` trong file `.env`).

## Cấu trúc JSON của một book

```json
{
  "_id": "66b1f0b8e3c9a7d1a1234567",
  "title": "Node.js Basics",
  "author": "Aptech",
  "category": "Programming",
  "available": true
}
```

| Field    | Kiểu    | Bắt buộc | Ghi chú                                   |
|----------|---------|----------|--------------------------------------------|
| _id      | ObjectId| tự sinh  | do MongoDB tự tạo khi insert               |
| title    | string  | có       | tên sách                                   |
| author   | string  | có       | tác giả                                    |
| category | string  | không    | mặc định `"General"` nếu không truyền      |
| available| boolean | không    | mặc định `true` nếu không truyền           |

## Danh sách endpoint mà ReactJS frontend sẽ gọi

| Method | Endpoint                     | Mục đích                          | Frontend dùng ở đâu       |
|--------|-------------------------------|------------------------------------|----------------------------|
| GET    | `/`                            | Kiểm tra server còn sống           | (health check, không bắt buộc) |
| GET    | `/books`                       | Lấy toàn bộ danh sách sách         | Màn hình danh sách sách    |
| GET    | `/books/:id`                   | Lấy chi tiết 1 sách                | Màn hình sửa sách (load dữ liệu cũ) |
| GET    | `/books/category/:category`    | Lọc sách theo category             | Ô tìm kiếm / bộ lọc trên màn hình danh sách |
| POST   | `/books`                       | Thêm sách mới                      | Màn hình thêm sách         |
| PUT    | `/books/:id`                   | Cập nhật sách                      | Màn hình sửa sách          |
| DELETE | `/books/:id`                   | Xóa sách                           | Nút xóa trên màn hình danh sách |

Ví dụ gọi API từ ReactJS:

```javascript
async function getBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books = await response.json();
  return books;
}

async function getBooksByCategory(category) {
  const response = await fetch(`http://localhost:3000/books/category/${category}`);
  return response.json();
}
```

## Những màn hình frontend dự kiến

Frontend sẽ được triển khai ở một project ReactJS riêng (ví dụ `library-frontend/`), chạy ở `http://localhost:5173`:

```
library-frontend/
  src/
    App.jsx
    components/
      BookList.jsx
      BookForm.jsx
```

1. **Danh sách sách** (`BookList.jsx`)
   - Gọi `GET /books` khi component mount để hiển thị bảng/danh sách sách.
   - Có ô lọc theo category, gọi `GET /books/category/:category`.
   - Mỗi dòng có nút "Sửa" và "Xóa".

2. **Thêm sách** (`BookForm.jsx` ở chế độ "create")
   - Form nhập `title`, `author`, `category`, `available`.
   - Submit gọi `POST /books`.

3. **Sửa sách** (`BookForm.jsx` ở chế độ "edit")
   - Khi mở form, gọi `GET /books/:id` để load dữ liệu hiện tại vào form.
   - Submit gọi `PUT /books/:id` với các field đã thay đổi.

4. **Xóa sách**
   - Bấm nút "Xóa" trên danh sách sẽ gọi `DELETE /books/:id`, sau đó cập nhật lại danh sách hiển thị.

## Lưu ý bảo mật

- File `.env` **không** được đưa lên GitHub (đã thêm vào `.gitignore`).
- Chỉ commit `.env.example` làm mẫu cấu hình.
