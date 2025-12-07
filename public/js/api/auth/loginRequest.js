import {apiRequest} from "../../Utils/fetchHelper.js";

const emailDocument = document.getElementById("email");
const passwordDocument = document.getElementById("password");

document.getElementById("loginButton").addEventListener('click', async () => {
    const email = emailDocument.value.trim();
    const password = passwordDocument.value.trim();
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    // 입력값 검증
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email || !password) {
        emailError.textContent = "이메일은 필수입니다.";
        return;
    } else if(!password){
        passwordError.textContent = "비밀번호는 필수입니다.";
        return;
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/auth/login`, "POST", {
            email: email,
            password: password,
        });

        sessionStorage.setItem("profileImageUrl", IMAGE_SERVEL_URL2 + data.profileImageUrl);
        sessionStorage.setItem("accessToken", data.accessToken);
        // alert(MESSAGES.LOGIN.SUCCESS);
        window.location.href = "/posts.html";
      
    }catch(err){
        console.error(err);
        alert(`${err.message}`);
    }
})