import {apiRequest} from "../../utils/fetchHelper.js";
let liked = false

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("postId");

    if(!postId) {
        alert("잘못된 접근입니다.");
        window.location.href = "/posts.html";
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/posts/${postId}`, "GET");
        console.log(data);
        renderPost(data);

    }catch(error) {
        console.log(error);
        alert("게시물 정보를 가져올 수 없습니다.");
        window.location.href = "/posts.html";
    }
})

function renderPost(post){
    window.liked = post.liked;
    // 제목
    document.querySelector(".post-title").textContent = post.title;

    // 작성자, 프로필 이미지, 날짜
    document.querySelector(".post-writer").textContent = post.authorName;
    document.querySelector("#postProfileIcon").src = post.authorProfileImage || "/images/default-profile.png";
    document.querySelector(".post-date").textContent = post.updatedAt;

    // 본문 이미지
    // 이미지
    const postImageContainer = document.querySelector(".post-image");
    postImageContainer.innerHTML = ""; // 기존 placeholder 제거
    if (post.postImageUrls && post.postImageUrls.length > 0) {
        post.postImageUrls.forEach(url => {
            const img = document.createElement("img");
            img.src = url;
            img.alt = "게시글 이미지";
            img.style.width = "100%";
            img.style.marginBottom = "10px";
            postImageContainer.appendChild(img);
        });
    } else {
        postImageContainer.innerHTML = "<p style='color:#777;'>이미지가 없습니다.</p>";
    }

    // 본문
    document.querySelector(".post-content p").textContent = post.content;


    // 좋아요, 댓글, 조회수
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers[0].textContent = post.likeCount;
    statNumbers[1].textContent = post.viewCount;
    statNumbers[2].textContent = post.commentCount;
    liked = post.liked;
    if(liked){
        document.getElementById("like-session").style.backgroundColor = "#d6455d";
    }
    likeApi(post)
}

function likeApi(post) {
    const likeSession = document.getElementById("like-session");
    const likeCount = document.getElementById("like-number");
    const postId = post.postId;
    likeSession.addEventListener("click", async () => {
        const requestUrl = `${SERVER_URL}/posts/${postId}/like`;
        const method = liked ? "DELETE" : "POST";

        try {
            const data = await apiRequest(requestUrl, method);
            console.log(data);
            console.log(liked);
            likeSession.style.background = liked ? "#f5f5f5" : "#d6455d";
            const curr = parseInt(likeCount.textContent);
            likeCount.textContent = liked ? String(curr - 1) : String(curr + 1);
            liked = !liked;

        } catch (e) {
            console.error(e);
            alert("좋아요 요청 실패! ");
        }
    })
}