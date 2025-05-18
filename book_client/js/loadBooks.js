const API_BASE = "http://localhost:8085";

let editingBookId = null;

const bookTableBody = document.getElementById("bookTableBody");

const loadItems = async () => {
    console.log("책 목록 로드 중...");
    try {
        const response = await fetch(`${API_BASE}/api/books`);
        if (!response.ok) {
            throw new Error("책 목록을 불러오는데 실패했습니다.");
        }
        const books = await response.json();
        renderBookTable(books);
    } catch (e) {
        console.error(e);
        alert("책 목록을 불러오는데 실패했습니다!");
        showError("책 목록을 불러오는데 실패했습니다!");
        bookTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #dc3545;">
                    오류: 데이터를 불러올 수 없습니다.
                </td>
            </tr>
        `;
    }
};

document.addEventListener("DOMContentLoaded", loadItems);

function renderBookTable(books) {
    bookTableBody.innerHTML = "";

    books.forEach((book) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title || "N/A"}</td>
            <td>${book.author || "N/A"}</td>
            <td>${book.isbn || "N/A"}</td>
            <td>${book.price || "N/A"}</td>
            <td>${book.publishDate || "N/A"}</td>
            <td>${book.detail ? book.detail.publisher : "N/A"}</td>
            <td>
                <button class="edit-btn" onclick="editBook(${
                    book.id
                })">수정</button>
                <button class="delete-btn" onclick="deleteBook(${
                    book.id
                })">삭제</button>
            </td>
        `;
        bookTableBody.appendChild(row);
    });
}
