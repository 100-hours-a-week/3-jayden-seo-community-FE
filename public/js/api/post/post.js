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

async function confirmDelete() {
    if (deleteTarget === "post") {
        try{
            const result = await fetch(`http://localhost:8080/posts/${postId}`, {
                method: "DELETE",
                credentials: "include"
            })
            if(result.ok) {
                alert("게시글이 삭제되었습니다.");
                window.location.href = '../../../posts.html';
            }else{
                const res = await result.json();
                console.log(res);
                alert("게시글이 삭제에 실패했습니다. " + res.message);
            }
        }catch (e){
            alert(e);
        }

    } else if (deleteTarget === "comment") {
        alert("댓글이 삭제되었습니다.");
    }
    closeModal();
}

document.getElementById("post-edit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "/updatePost.html?postId=" + postId;
});