let deleteTarget = null;
const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

function openModal(type) {
    deleteTarget = type;
    document.getElementById("modalText").textContent =
        type === "post" ? "게시글을 삭제하시겠습니까?" : "댓글을 삭제하시겠습니까?";
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deleteModal").style.display = "none";
    deleteTarget = null;
}

function confirmDelete() {
    if (deleteTarget === "post") {
        alert("게시글이 삭제되었습니다.");
    } else if (deleteTarget === "comment") {
        alert("댓글이 삭제되었습니다.");
    }
    closeModal();
}

document.getElementById("post-edit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "/updatePost.html?postId=" + postId;
});