import {apiRequest} from "../../Utils/fetchHelper.js";

document.getElementById("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password !== passwordConfirm) {
        alert(MESSAGES.MEMBER.PASSWORD_MISMATCH);
        return;
    }
    const requestBody = {
        password,
        passwordConfirm
    }

    try {
        const data = await apiRequest(`${SERVER_URL}/member/password`, "PUT", requestBody);
        alert(MESSAGES.MEMBER.UPDATE_PASSWORD_SUCCESS);
    }catch (error) {
        alert(error.message);
    }
});