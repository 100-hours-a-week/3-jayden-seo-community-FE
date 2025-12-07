import {apiRequest} from "../../Utils/fetchHelper.js";

document.getElementById("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const passwordError = document.getElementById("passwordError");
    const passwordConfirmError = document.getElementById("passwordConfirmError");

    passwordError.textContent = "";
    passwordConfirmError.textContent = "";
    if (password !== passwordConfirm) {
        passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
        return;
    }
    const requestBody = {
        password,
        passwordConfirm
    }

    try {
        const data = await apiRequest(`${SERVER_URL}/member/password`, "PUT", requestBody);
        alert(MESSAGES.MEMBER.UPDATE_PASSWORD_SUCCESS);
        window.location.reload();
    }catch (error) {
        passwordError.textContent = "";
        passwordConfirmError.textContent = "";
        const field = error.field;
        if (field === "password") {
            passwordError.textContent = error.message;
        }else if(field === "passwordConfirm") {
            passwordConfirmError.textContent = error.message;
        }
    }
});