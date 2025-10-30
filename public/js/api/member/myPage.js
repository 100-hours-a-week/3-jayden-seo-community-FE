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
        alert("닉네임을 입력해주세요.");
        return;
    }

    try {
        const data = await apiRequest(
            `${SERVER_URL}/member/nickname/duplicate?nickname=${encodeURIComponent(nickname)}`,
            "GET"
        )
        if (!data.isValidate){
            alert("사용 가능한 닉네임입니다!");
            confirmBtn.style.display = 'block'; // ✅ 수정완료 버튼 표시
        }else{
            alert("이미 존재하는 닉네임입니다.");
            confirmBtn.style.display = 'none'; // ✅ 다시 숨김
        }
    } catch (error) {
        console.error(error.message);
        alert("닉네임 확인 중 오류가 발생했습니다." + error.message);
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
                alert("이미지 업로드 실패");
                return
            }
            const data = await result.json();
            profileImageUrl = data.path;
        }catch (error) {
            alert("이미지 업로드 실패");
            console.log(error);
        }
    }

    const requestBody = {
        nickname,
        profileImageUrl
    }

    try {
        const data = await apiRequest(`${SERVER_URL}/member`, "PUT", requestBody);
        alert('회원정보가 성공적으로 변경되었습니다.');
        window.location.reload();

        isNewImage = false;
        sessionStorage.setItem("profileImageUrl", profileImageUrl);

    }catch (error) {
        alert(error.message);
    }
});