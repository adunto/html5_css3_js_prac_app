//전역변수
const API_BASE_URL = "http://localhost:8085";

const bookForm = document.getElementById("book-register-form");
const bookTableBody = document.getElementById("bookTableBody");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form 제출 되었음...");

  //FormData 객체생성 <form>엘리먼트를 객체로 변환
  const bFormData = new FormData(bookForm);

  bFormData.forEach((value, key) => {
    console.log(key + " = " + value);
  });

  const bookData = {
    title: bFormData.get("book-title")?.trim(),
    author: bFormData.get("book-author")?.trim(),
    isbn: bFormData.get("book-isbn")?.trim(),
    price: bFormData.get("book-price")?.trim(),
    publishDate: bFormData.get("book-publish-date"),
    language: bFormData.get("language")?.trim(),
    pageCount: bFormData.get("pageCount")?.trim(),
    publisher: bFormData.get("publisher")?.trim(),
    edition: bFormData.get("edition")?.trim(),
    coverImageUrl: bFormData.get("coverImageUrl")?.trim(),
    description: bFormData.get("description"),
  };

  if (!validateBook(bookData)) {
    return;
  }

  console.log(bookData);
});

// 유효성 체크
const validateBook = (book) => {
  if (!book.title) {
    alert("제목을 입력해주세요.");
    return false;
  }
  if (!book.author) {
    alert("저자를 입력해주세요.");
    return false;
  }
  if (!book.isbn) {
    alert("ISBN을 입력해주세요.");
    return false;
  }
  if (!book.price) {
    alert("가격을 입력해주세요.");
    return false;
  }

  return true;
};

const loadBooks = async () => {
  console.log("책 목록 로드 중.....");

  try {
    const response = await fetch(`${API_BASE_URL}/api/books`);
    if (!response.ok) {
      throw new Error("책 목록을 불러오는 데 실패했습니다.");
    }
    const books = await response.json();
    bookTableBody.innerHTML = ""; // 기존 테이블 내용 초기화
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.price}</td>
        <td>${book.publishDate}</td>
        <td>${book.detail.publisher}</td>
      `;
      row.addEventListener("click", () => {
        // 책 상세보기 페이지로 이동
        console.log("책 클릭됨 : " + book.title);
      });
      row.style.cursor = "pointer";
      bookTableBody.appendChild(row);
    });
  } catch (e) {
    console.error(e);
  }
};

document.addEventListener("DOMContentLoaded", loadBooks);
