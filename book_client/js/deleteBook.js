function deleteBook(bookId) {
    if (!confirm(`${bookId}번 책을 정말 삭제하시겠습니까?`)) {
        return;
    }
    fetch(`${API_BASE_URL}/api/books/${bookId}`, {
        method: "DELETE",
    })
        .then(async (response) => {
            if (!response.ok) {
                //응답 본문을 읽어서 에러 메시지 추출
                const errorData = await response.json();
                //status code와 message를 확인하기
                if (response.status === 404) {
                    //중복 오류 처리
                    throw new Error(errorData.message || "책 정보가 없습니다.");
                } else {
                    //기타 오류 처리
                    throw new Error(
                        errorData.message || "책 삭제에 실패했습니다."
                    );
                }
            }
            showSuccess("책이 성공적으로 삭제되었습니다.");
            loadItems();
        })
        .catch((error) => {
            showError(error.message);
        });
}
