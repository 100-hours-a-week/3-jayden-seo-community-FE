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
        type === "post" ? MESSAGES.POST.DELETE_CONFIRMATION: MESSAGES.COMMENT.DELETE_CONFIRMATION;
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
            // alert(MESSAGES.POST.DELETE_SUCCESS);
            window.location.href = '../../../posts.html';
        }catch (error){
            alert(error.message);
        }

    } else if (deleteTarget === "comment") {
        try {
            const data = await apiRequest(`${SERVER_URL}/comments/${deleteId}`, "DELETE");
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