import {apiRequest} from "../../Utils/fetchHelper.js";

document.getElementById("loginForm").addEventListener("submit", async event => {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }
    const requestBody = {
        password,
        passwordConfirm
    }

    try {
        const data = await apiRequest(`${SERVER_URL}/member/password`, "PUT", requestBody);
        alert('비밀번호가 성공적으로 변경되었습니다.');
    }catch (error) {
        alert(error.message);
    }
});