const cancelButton = bookForm.querySelector(".cancel-btn");
const submitButton = bookForm.querySelector(`button[type="submit"]`);

function resetForm() {
    bookForm.reset();
    submitButton.textContent = "학생 등록";
    cancelButton.style.display = "none";
    clearMessages();
    editingBookId = null;
}
