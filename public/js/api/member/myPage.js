const BASE_URL = require("public/config/constant.js");

document.getElementById('checkButton').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value.trim();
    const confirmBtn = document.getElementById('confirmButton')
    if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return;
    }

    try {
        const result = await fetch(
            `BASE_URL/member/nickname/duplicate?nickname=${encodeURIComponent(nickname)}`, {
            method: 'GET'
        });

        if (result.ok) {
            alert("사용 가능한 닉네임입니다!");
            confirmBtn.style.display = 'block'; // ✅ 수정완료 버튼 표시
        } else {
            alert("이미 존재하는 닉네임입니다.");
            console.log(result);
            confirmBtn.style.display = 'none'; // ✅ 다시 숨김
        }
    } catch (err) {
        console.error(err);
        alert("닉네임 확인 중 오류가 발생했습니다.");
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const result = await fetch("BASE_URL/member", {
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

document.getElementById("confirmButton").addEventListener("click", async event => {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value;
    const profileImageUrl = "exmple@example.com";

    const requestBody = {
        nickname,
        profileImageUrl
    }

    try {
        const response = await fetch("BASE_URL/member", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        });

        if (response.ok) {
            alert('회원정보가 성공적으로 변경되었습니다.');
            window.location.reload();
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }

    }catch (error) {
        alert(error.response.data);
    }
});