document.getElementById("confirmButton").addEventListener("click", async event => {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value;
    const profileImageUrl = "exmple@example.com";

    const requestBody = {
        nickname,
        profileImageUrl
    }

    try {
        const response = await fetch("http://localhost:8080/member", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        });

        if (response.ok) {
            alert('회원정보가 성공적으로 변경되었습니다.');
        } else {
            const errorData = await response.json();
            alert(errorData.message);
            // alert(errorData.message || '비밀번호 변경에 실패했습니다.');
        }

    }catch (error) {
        alert(error.response.data);
    }
});