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
        const res = await fetch(`${SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
            credentials: "include"  // ★ 세션 쿠키 공유 필수
        });

        if(res.ok){
            alert("로그인 성공!");
            window.location.href = "/posts.html";
        }else{
            const response = await res.json();
            alert("로그인 실패! " + response.message);
        }
    }catch(err){
        console.error(err);
        alert("서버 요청 중 오류가 발생했습니다.");
    }

})