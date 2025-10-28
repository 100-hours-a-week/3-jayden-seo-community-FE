const input = document.getElementById('imageInput');
const label = document.getElementById('fileLabel');

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
    const imageUrls = [];

    if(!title || !content) {
        alert("제목과 내용 모두 입력해주세요.");
    }

    const postImage = imageInput.files[0];
    if(postImage) {
        try{
            const formData = new FormData();
            formData.append("file", postImage);

            const response = await fetch(`${IMAGE_SERVER_URL}/upload`, {
                method: "POST",
                body: formData,
            });
            if(!response.ok){
                alert("이미지 업로드 실패");
                return
            }
            const res = await response.json();
            imageUrls.push(res.path);

        }catch (error){
            alert("이미지 업로드 실패!");
        }
    }

    const postData = {
        title,
        content,
        imageUrls,
    }

    try{
        const response = await fetch(`${SERVER_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include',
        });

        if(response.ok){
            alert("게시글이 성공적으로 작성되었습니다.");
            window.location.assign("/posts.html");
        }else {
            const error = await response.json();
            alert(error.message);
            window.location.assign("/posts.html");
        }
    }catch (error) {
        console.error("Error:", error);
        alert("요청 중 오류가 발생했습니다.");
    }
})