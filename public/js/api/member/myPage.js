document.getElementById('checkButton').addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value.trim();
    const confirmBtn = document.getElementById('confirmButton')
    if (!nickname) {
        alert("닉네임을 입력해주세요.");
        // return;
    }
    confirmBtn.style.display =
        confirmBtn.style.display === 'none' ? 'block' : 'none';
    // try {
    //     const res = await fetch(`/user/check-nickname?nickname=${encodeURIComponent(nickname)}`, {
    //         method: 'GET'
    //     });
    //     const result = await res.json();
    //
    //     if (result.available) {
    //         alert("사용 가능한 닉네임입니다!");
    //         document.getElementById('confirmBtn').style.display = 'inline-block'; // ✅ 수정완료 버튼 표시
    //     } else {
    //         alert("이미 존재하는 닉네임입니다.");
    //         document.getElementById('confirmBtn').style.display = 'none'; // ✅ 다시 숨김
    //     }
    // } catch (err) {
    //     console.error(err);
    //     alert("닉네임 확인 중 오류가 발생했습니다.");
    // }
});

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const result = await fetch("http://localhost:8080/member", {
            method: 'GET',
            credentials: 'include'
        })

        if(!result.ok){
            alert("로그인이 필요합니다.");
            window.location.href = "/login.html";
            return;
        }else {
            const member = await result.json();

            document.getElementById('email').value = member.email;
        }
    }catch (e){
        console.error(e);
        alert("서버 오류가 발생했습니다.");
        window.location.href = "/login.html";
    }
})