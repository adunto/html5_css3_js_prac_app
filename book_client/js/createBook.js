const bookForm = document.getElementById("book-register-form");

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("폼 제출됨");

    const bookFormData = new FormData(bookForm);

    const bookData = {
        title: bookFormData.get("title").trim(),
        author: bookFormData.get("author").trim(),
        isbn: bookFormData.get("isbn").trim(),
        price: parseInt(bookFormData.get("price").trim()) || NaN,
        publishDate: bookFormData.get("publishDate") || null,
        detail: {
            description: bookFormData.get("description"),
            language: bookFormData.get("language"),
            pageCount: parseInt(bookFormData.get("pageCount")),
            publisher: bookFormData.get("publisher"),
            coverImageUrl: bookFormData.get("coverImageUrl"),
            edition: bookFormData.get("edition"),
        },
    };

    if (!validateBook(bookData)) {
        return;
    }

    console.log(editingBookId);

    if (editingBookId) {
        updateBook(editingBookId, bookData);
    } else {
        createBook(bookData);
    }
});

async function createBook(bookData) {
    try {
        const response = await fetch(`${API_BASE}/api/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 409) {
                throw new Error(
                    errorData.message || "중복 되는 정보가 있습니다."
                );
            } else {
                //기타 오류 처리
                throw new Error(errorData.message || "책 등록에 실패했습니다.");
            }
        }

        const jsonData = await response.json();
        showSuccess("책이 성공적으로 등록되었습니다.");
        loadItems();
        resetForm();
    } catch (e) {
        console.error(e.message);
        showError(e.message);
    }
}

//데이터 유효성을 체크하는 함수
function validateBook(book) {
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
    if (!book.detail.description) {
        alert("설명을 입력해주세요.");
        return false;
    }
    if (!book.detail.language) {
        alert("언어를 입력해주세요.");
        return false;
    }
    if (!book.detail.pageCount) {
        alert("페이지 수를 입력해주세요.");
        return false;
    }
    if (!book.detail.publisher) {
        alert("출판사를 입력해주세요.");
        return false;
    }
    if (!book.detail.coverImageUrl) {
        alert("표지 이미지 URL을 입력해주세요.");
        return false;
    }
    if (!book.detail.edition) {
        alert("에디션을 입력해주세요");
        return false;
    }
    // URL 형식 검사

    // 에디션 형식 검사

    return true;
}
