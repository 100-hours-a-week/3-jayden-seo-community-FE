import {apiRequest} from "../../Utils/fetchHelper.js";

const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");
let deleteTarget = null;
let deleteId = null;

document.getElementById("deletePost").addEventListener("click", () => {
    openModal("post");
})

document.querySelector(".confirm-btn").addEventListener("click", () => {
    confirmDelete();
})

document.querySelector(".cancel-btn").addEventListener("click", () => {
    closeModal();
})

export function openModal(type, id) {
    deleteTarget = type;
    deleteId = id;

    document.getElementById("modalText").textContent =
        type === "post" ? "게시글을 삭제하시겠습니까?" : "댓글을 삭제하시겠습니까?";
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deleteModal").style.display = "none";
    deleteTarget = null;
}

async function confirmDelete() {
    if (deleteTarget === "post") {
        try{
            const data = await apiRequest(`${SERVER_URL}/posts/${postId}`, "DELETE");
            alert("게시글이 삭제되었습니다.");
            window.location.href = '../../../posts.html';
        }catch (error){
            alert(error.message);
        }

    } else if (deleteTarget === "comment") {
        try {
            const data = await apiRequest(`${SERVER_URL}/comments/${deleteId}`, "DELETE");
            alert("댓글이 삭제되었습니다.");
            window.location.reload();
            return;
        }catch (error){
            alert(error.message);
        }
    }
    closeModal();
}

document.getElementById("post-edit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "/updatePost.html?postId=" + postId;
});