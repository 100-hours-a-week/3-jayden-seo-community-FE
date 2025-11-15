import {apiRequest} from "../../Utils/fetchHelper.js";

const emailDocument = document.getElementById("email");
const passwordDocument = document.getElementById("password");

document.getElementById("loginButton").addEventListener('click', async () => {
    const email = emailDocument.value.trim();
    const password = passwordDocument.value.trim();

    // 입력값 검증
    if (!email || !password) {
        alert(MESSAGES.LOGIN.INPUT_REQUIRED);
        return;
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/auth/login`, "POST", {
            email: email,
            password: password,
        });
        alert(MESSAGES.LOGIN.SUCCESS);
        sessionStorage.setItem("profileImageUrl", IMAGE_SERVEL_URL2 + data.profileImageUrl);
        window.location.href = "/posts.html";

    }catch(err){
        console.error(err);
        alert(`${err.message}`);
    }

})