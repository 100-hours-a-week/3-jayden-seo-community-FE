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
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        });

        const result = await res.json();
        if(result.success){
            alert("로그인 성공!");
        }else{
            alert(result.message || "로그인 실패");
        }
    }catch(err){
        console.error(err);
        alert("서버 요청 중 오류가 발생했습니다.");
    }

})