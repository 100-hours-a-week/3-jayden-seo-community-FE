const postList = document.getElementById("postList");
const loading = document.getElementById("loading");

let lastId = null;
let isLoading = false;
let hasMore = true;

function appendPosts(posts) {
    posts.forEach((p) => {
        const card = document.createElement("div");
        card.className = "post-card";
        card.dataset.id = p.id;
        card.innerHTML = `
      <div class="post-header">
        <h2 class="post-title">${p.title}</h2>
        <span class="post-date">${p.updatedAt}</span>
      </div>
      <div class="post-stats">
        <span>좋아요 ${p.likeCount}</span>
        <span>댓글 ${p.commentCount}</span>
        <span>조회수 ${p.viewCount}</span>
      </div>
      <div class="post-author">
        <img src="${p.authorProfileImage}" class="author-img" alt="user">
        <span class="author-name">${p.authorName}</span>
      </div>
    `;
        postList.appendChild(card);
    });
}

async function loadPosts() {
    if (isLoading || !hasMore) return;
    isLoading = true;
    loading.style.display = "block";

    try{
        const url = lastId
            ? `http://localhost:8080/posts?lastId=${lastId}`
            : `http://localhost:8080/posts`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            res = await response.json();
            alert(res.message);
        }

        const data = await response.json();

        appendPosts(data.posts);
        lastId = data.nextCursor
        hasMore = data.hasNext;
    }catch(e){
        console.error(e);
        alert(e);
    }finally {
        loading.style.display = "none";
        isLoading = false;
    }
}

// 🔹 무한 스크롤 이벤트
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // scrollTop: 현재 스크롤된 높이
    // clientHeight: 현재 보이는 영역의 높이
    // scrollHeight: 전체 문서의 총 높이
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        loadPosts();
    }
});

document.getElementById("newPostButton").addEventListener("click", () => {
    window.location.href = "/createPost.html";
});
// 첫 게시글 표시
loadPosts();