import {apiRequest} from "../../Utils/fetchHelper.js";

const profileInput = document.getElementById("profileInput");
const preview = document.getElementById("preview");

profileInput.addEventListener("change", (e) => {
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
});

document.getElementById("registerForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const nickname = document.getElementById("nickname").value;
    const profileFile = profileInput.files[0];

    if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }

    // 임시 프로필 사진 이미지 url
    let profileImageUrl = "https://example.com/default-profile.png";

    if(profileFile){
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
        email,
        password,
        passwordConfirm,
        nickname,
        profileImageUrl
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/member/register`, "POST", requestBody);
        alert("회원가입이 완료되었습니다.");
        window.location.href = "/login.html";
    }catch(err){
        console.log(err);
        alert(err.message);
        window.location.href = "/register.html";
    }
})