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
        const response = await fetch(`${SERVER_URL}/member/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        });

        if (response.ok) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
        } else {
            const errorData = await response.json();
            alert(errorData.message);
            // alert(errorData.message || '비밀번호 변경에 실패했습니다.');
        }

    }catch (error) {
        alert(error.response.data);
    }
});