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

// document.getElementById('confirmBtn').addEventListener('click', async () => {
//     const nickname = document.getElementById('nickname').value.trim();
//     const res = await fetch('/user/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nickname })
//     });
//     const result = await res.json();
//     if (result.success) alert("회원정보가 수정되었습니다!");
// });