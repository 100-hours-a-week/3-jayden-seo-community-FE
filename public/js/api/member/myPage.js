import {apiRequest} from "../../Utils/fetchHelper.js";

let isNewImage = false;

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const data = await apiRequest(`${SERVER_URL}/member`, "GET");

        document.getElementById('email').value = data.email;
        document.getElementById('preview').src = IMAGE_SERVEL_URL2 + data.imageUrl;
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
        try{
            const res = await fetch("https://16jdujbqqc.execute-api.ap-northeast-2.amazonaws.com/upload/presigned", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    fileName: profileFile.name,
                    fileType: profileFile.type,
                    folder: "profile",
                })
            })
            const data = await res.json();
            const uploadUrl = data.uploadUrl;
            profileImageUrl = data.key;

            await fetch(uploadUrl, {
                method: "PUT",
                headers: {"Content-Type": profileFile.type},
                body: profileFile
            });
            sessionStorage.setItem("profileImageUrl", IMAGE_SERVEL_URL2 + data.profileImageUrl);

        }catch(e){
            alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
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
        if(isNewImage){
            sessionStorage.setItem("profileImageUrl", IMAGE_SERVEL_URL2 + profileImageUrl);
        }
        isNewImage = false;
    }catch (error) {
        alert(error.message);
    }
});