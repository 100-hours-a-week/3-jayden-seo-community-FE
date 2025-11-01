import {apiRequest} from "../../Utils/fetchHelper.js";

const emailDocument = document.getElementById("email");
const passwordDocument = document.getElementById("password");

document.getElementById("loginButton").addEventListener('click', async () => {
    const email = emailDocument.value.trim();
    const password = passwordDocument.value.trim();

    // 입력값 검증
    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/auth/login`, "POST", {
            email: email,
            password: password,
        });

        alert("로그인 성공!");
        sessionStorage.setItem("profileImageUrl", data.profileImageUrl);
        sessionStorage.setItem("accessToken", data.accessToken);
        window.location.href = "/posts.html";

    }catch(err){
        console.error(err);
        alert(`${err.message}`);
    }

})