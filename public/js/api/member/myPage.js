import {apiRequest} from "../../Utils/fetchHelper.js";

let isNewImage = false;

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const data = await apiRequest(`${SERVER_URL}/member`, "GET");

        document.getElementById('email').value = data.email;
        document.getElementById('preview').src = data.imageUrl;
    }catch (err){
        console.error(err.message);
        alert(err.message);
        window.location.href = "/login.html";
    }
})

document.getElementById("profileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = "block";
        preview.style.width = "120px";
        preview.style.height = "120px";
        preview.style.objectFit = "cover";
        preview.style.borderRadius = "100%";
    };
    reader.readAsDataURL(file);
    isNewImage = true;
});

document.getElementById('checkButton').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value.trim();
    const confirmBtn = document.getElementById('confirmButton')
    if (!nickname) {
        alert(MESSAGES.MEMBER.NICKNAME_REQUIRED);
        return;
    }

    try {
        const data = await apiRequest(
            `${SERVER_URL}/member/nickname/duplicate?nickname=${encodeURIComponent(nickname)}`,
            "GET"
        )
        if (!data.isValidate){
            alert(MESSAGES.MEMBER.NICKNAME_AVAILABLE);
            confirmBtn.style.display = 'block'; // ✅ 수정완료 버튼 표시
        }else{
            alert(MESSAGES.MEMBER.NICKNAME_UNAVAILABLE);
            confirmBtn.style.display = 'none'; // ✅ 다시 숨김
        }
    } catch (error) {
        console.error(error.message);
        alert(MESSAGES.MEMBER.NICKNAME_CHECK_ERROR)
    }
});

document.getElementById("confirmButton").addEventListener("click", async event => {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value;
    const profileFile = document.getElementById("profileInput").files[0];
    let profileImageUrl = null;

    if(isNewImage){
        const formData = new FormData();
        formData.append("file", profileFile);
        try{
            const result = await fetch(`${IMAGE_SERVER_URL}/upload`, {
                method: "POST",
                body: formData,
            });
            if(!result.ok){
                alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
                return
            }
            const data = await result.json();
            profileImageUrl = data.path;
        }catch (error) {
            alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
            console.log(error);
        }
    }

    const requestBody = {
        nickname,
        profileImageUrl
    }

    try {
        const data = await apiRequest(`${SERVER_URL}/member`, "PUT", requestBody);
        alert(MESSAGES.MEMBER.UPDATE_PROFILE_SUCCESS);
        window.location.reload();

        isNewImage = false;
        sessionStorage.setItem("profileImageUrl", profileImageUrl);

    }catch (error) {
        alert(error.message);
    }
});