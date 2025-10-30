import {openModal} from "../post/deletePost.js";
import {apiRequest} from "../../Utils/fetchHelper.js";

let editingCommentId = null;

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("postId");
    await fetchComments(postId);

    if(!postId) {
        alert("잘못된 접근입니다.");
        window.location.href = "/posts.html";
    }

    let textarea = document.querySelector(".comment-form textarea");
    const submitButton = document.querySelector(".comment-submit");

    submitButton.addEventListener("click", async () => {
        const content = textarea.value.trim();

        if (!content) {
            alert("댓글을 입력해주세요");
        }
        console.log(editingCommentId);
        if(editingCommentId) {
            try {
                const data = await apiRequest(`${SERVER_URL}/comments/${editingCommentId}`,
                    "PATCH", {content});

                alert("댓글이 수정되었습니다.");
                editingCommentId = null;
                window.location.reload();

            }catch (err){
                alert(err.message);
            }

        }else {

            try {
                const data = await apiRequest(`${SERVER_URL}/posts/${postId}/comments`,
                    "POST", {content});

                appendComment(data);
                textarea.value = ""; // 댓글 입력창 초기화
            } catch (err) {
                console.log(err);
                alert(err.message);
            }
        }
    })
})

async function fetchComments(postId) {
    try{
        const result = await fetch(`${SERVER_URL}/posts/${postId}/comments`, {
            method: "GET",
            credentials: "include",
        })
        const data = await result.json();
        if(!result.ok) {
            alert(data.message);
            return;
        }
        renderComments(data.comments);
    }catch(e){
        console.log(e);
        alert("댓글 가져오기 오류!");
    }
}

function renderComments(comments) {
    const list = document.querySelector(".comment-list");
    list.innerHTML = "";

    if (comments.length === 0) {
        list.innerHTML = `<p style="color:#777;">댓글이 없습니다.</p>`;
        return;
    }

    comments.forEach((c) => appendComment(c));
}

function appendComment(comment) {
    const list = document.querySelector(".comment-list");

    const item = document.createElement("div");
    item.className = "comment-item";
    item.dataset.commentId = comment.commentId;
    item.innerHTML = `
    <div class="comment-header">
      <div class="comment-info">
        <img src="${comment.authorProfileImage || "/images/default-profile.png"}"
             class="profile-icon"
             alt="user">
        <span class="comment-writer">${comment.authorNickname}</span>
        <span class="comment-date">${comment.updatedAt}</span>
      </div>
      <div class="comment-actions">
        <button class="edit-btn">수정</button>
        <button class="delete-btn" id="deleteComment">삭제</button>
      </div>
    </div>
    <div class="comment-content">${comment.content}</div>
  `;
    item.querySelector(".edit-btn").addEventListener("click", () => {
        const textarea = document.querySelector(".comment-form textarea");
        const submitButton = document.querySelector(".comment-submit");

        const content = item.querySelector(".comment-content").textContent;
        textarea.value = content;
        textarea.focus();

        editingCommentId = item.dataset.commentId; // 수정 대상 ID 저장
        submitButton.textContent = "댓글 수정";
    });
    item.querySelector("#deleteComment").addEventListener("click", () => {
        openModal("comment", comment.commentId);
    })

    list.prepend(item);
}
