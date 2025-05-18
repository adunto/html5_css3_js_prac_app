const formError = document.getElementById("formError");

// 성공 메세지 출력
function showSuccess(message) {
    formError.textContent = message;
    formError.style.display = "block";
    formError.style.color = "#28a745";
}

// 에러 메세지 출력
function showError(message) {
    formError.textContent = message;
    formError.style.display = "block";
    formError.style.color = "#dc3545";
}

//메시지 초기화
function clearMessages() {
    formError.style.display = "none";
}
