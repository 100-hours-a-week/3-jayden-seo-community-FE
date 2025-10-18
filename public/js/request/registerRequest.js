document.getElementById("registerForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const nickname = document.getElementById("nickname").value;

    if (password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
    }

    // 임시
    const profileImageUrl = "https://example.com/default-profile.png";

    const requestBody = {
        email,
        password,
        passwordConfirm,
        nickname,
        profileImageUrl
    }

    try{
        const response = await fetch("http://localhost:8080/member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("회원가입 실패: " + (errorData.message || "알 수 없는 오류"));
            return;
        }

        alert("회원가입이 완료되었습니다.");
    }catch(err){
        console.log(err);
    }
})