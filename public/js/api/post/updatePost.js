import {apiRequest} from "../../Utils/fetchHelper.js";

const input = document.getElementById('imageInput');
const label = document.getElementById('fileLabel');
const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

input.addEventListener('change', () => {
    if (input.files.length > 0) {
        label.textContent = input.files[0].name;
    } else {
        label.textContent = '파일을 선택해주세요.';
    }
});

document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const imageInput = document.getElementById("imageInput");
    const fileLabel = document.getElementById("fileLabel");

    if(!title || !content) {
        alert("제목과 내용 모두 입력해주세요.");
    }

    // ✅ 임시 이미지 경로 (파일명 기반)
    const imageUrls = ["example1@example.com", "example2@example.com"];
    // if (imageInput.files.length > 0) {
    //     // 실제 업로드는 안 하지만, 예시로 임시 경로 구성
    //     for (const file of imageInput.files) {
    //         imageUrls.push(`/temp/uploads/${file.name}`);
    //     }
    // }

    const postData = {
        title,
        content,
        imageUrls,
    }
    try{
        const data = await apiRequest(`${SERVER_URL}/posts/${postId}`, "PATCH", postData);
        alert("게시글이 성공적으로 수정되었습니다.");
        window.location.href = "/posts.html";

        // if(response.ok){
        //     alert("게시글이 성공적으로 수정되었습니다.");
        //     window.location.href = "/posts.html";
        //     // document.getElementById("postForm").reset();
        //     // fileLabel.textContent = "파일을 선택해주세요.";
    }catch (error) {
        console.error("Error:", error);
        alert(error.message);
        window.location.href = `/post.html?postId=${postId}`;
    }
})