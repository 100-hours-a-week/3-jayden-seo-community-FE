const postList = document.getElementById("postList");
const loading = document.getElementById("loading");

let page = 1;
let isLoading = false;


// 🔹 임시 데이터 생성 (fetch 대신 사용)
function generateMockPosts(page) {
    const posts = [];
    for (let i = 0; i < 5; i++) {
        const id = (page - 1) * 5 + i + 1;
        posts.push({
            title: `게시글 제목 ${id}`,
            modifiedAt: `2025-10-${20 - (i % 5)}`,
            likeCount: Math.floor(Math.random() * 100),
            commentCount: Math.floor(Math.random() * 30),
            viewCount: Math.floor(Math.random() * 1000),
            authorImage: "https://via.placeholder.com/40",
            authorNickname: `사용자 ${id}`,
        });
    }
    return posts;
}

function appendPosts(posts) {
    posts.forEach((p) => {
        const card = document.createElement("div");
        card.className = "post-card";
        card.innerHTML = `
      <div class="post-header">
        <h2 class="post-title">${p.title}</h2>
        <span class="post-date">${p.modifiedAt}</span>
      </div>
      <div class="post-stats">
        <span>좋아요 ${p.likeCount}</span>
        <span>댓글 ${p.commentCount}</span>
        <span>조회수 ${p.viewCount}</span>
      </div>
      <div class="post-author">
        <img src="${p.authorImage}" class="author-img" alt="user">
        <span class="author-name">${p.authorNickname}</span>
      </div>
    `;
        postList.appendChild(card);
    });
}

async function loadPosts() {
    if (isLoading) return;
    isLoading = true;
    loading.style.display = "block";

    await new Promise((r) => setTimeout(r, 800)); // 로딩 느낌
    const posts = generateMockPosts(page);
    appendPosts(posts);

    loading.style.display = "none";
    isLoading = false;
    page++;
}

// 🔹 무한 스크롤 이벤트
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
        loadPosts();
    }
});

// 첫 게시글 표시
loadPosts();