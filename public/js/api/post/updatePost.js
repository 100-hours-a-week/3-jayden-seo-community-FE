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
    let imageUrls = null;

    if(!title || !content) {
        alert(MESSAGES.POST.TITLE_CONTENT_REQUIRED);
    }

    const postImage = imageInput.files[0];
    let uploadUrl;

    if (postImage){
        // try{
        //     const formData = new FormData();
        //     formData.append("file", postImage);
        //
        //     const response = await fetch(`${IMAGE_SERVER_URL}/upload`, {
        //         method: "POST",
        //         body: formData,
        //     });
        //     if(!response.ok){
        //         alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
        //         return
        //     }
        //     const res = await response.json();
        //     imageUrls = [res.path];
        //
        // }catch (error){
        //     alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
        // }
        const res = await fetch("https://16jdujbqqc.execute-api.ap-northeast-2.amazonaws.com/upload/presigned", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fileName: postImage.name,
                fileType: postImage.type,
                folder: "post",
            })
        })
        const data = await res.json();
        const imageUrl = data.key;
        uploadUrl = data.uploadUrl;

        await fetch(uploadUrl, {
            method: "PUT",
            headers: {"Content-Type": postImage.type},
            body: postImage
        });
        imageUrls = [imageUrl];
    }

    const postData = {
        title,
        content,
        imageUrls,
    }
    try{
        const data = await apiRequest(`${SERVER_URL}/posts/${postId}`, "PATCH", postData);
        alert(MESSAGES.POST.UPDATE_SUCCESS);
        window.location.href = "/posts.html";
    }catch (error) {
        alert(error.message);
        window.location.href = `/post.html?postId=${postId}`;
    }
})