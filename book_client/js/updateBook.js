function updateBook(bookId, bookData) {
    fetch(`${API_BASE}/api/books/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData), //Object => json
    })
        .then(async (response) => {
            if (!response.ok) {
                //응답 본문을 읽어서 에러 메시지 추출
                const errorData = await response.json();
                //status code와 message를 확인하기
                if (response.status === 409) {
                    //중복 오류 처리
                    throw new Error(
                        errorData.message || "중복 되는 정보가 있습니다."
                    );
                } else {
                    //기타 오류 처리
                    throw new Error(
                        errorData.message || "책 등록에 실패했습니다."
                    );
                }
            }
            return response.json();
        })
        .then((result) => {
            bookForm.reset();
            //목록 새로 고침
            loadItems();
            resetForm();
            showSuccess("책이 성공적으로 등록되었습니다!");
        })
        .catch((error) => {
            showError(error.message);
        });
}

// 학생 수정전에 데이터 로드하는 함수
function editBook(bookId) {
    fetch(`${API_BASE}/api/books/${bookId}`)
        .then(async (response) => {
            if (!response.ok) {
                //응답 본문을 읽어서 에러 메시지 추출
                const errorData = await response.json();
                //status code와 message를 확인하기
                if (response.status === 404) {
                    //중복 오류 처리
                    throw new Error(errorData.message || "책 정보가 없습니다.");
                }
            }
            return response.json();
        })
        .then((book) => {
            bookForm.title.value = book.title;
            bookForm.author.value = book.author;
            bookForm.isbn.value = book.isbn;
            bookForm.price.value = book.price || NaN;
            bookForm.publishDate.value = book.publishDate || "";
            if (book.detail) {
                bookForm.language.value = book.detail.language;
                bookForm.pageCount.value = book.detail.pageCount;
                bookForm.publisher.value = book.detail.publisher;
                bookForm.edition.value = book.detail.edition;
                bookForm.description.value = book.detail.description;
                bookForm.coverImageUrl.value = book.detail.coverImageUrl;
            }

            // 수정 Mode 설정
            editingBookId = bookId;
            // 버튼 title 수정
            submitButton.textContent = "책 수정";
            cancelButton.style.display = "inline-block";
        })
        .catch((error) => {
            showError(error.message);
        });
}
