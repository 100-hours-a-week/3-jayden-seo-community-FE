let isNewImage = false;

window.addEventListener('DOMContentLoaded', async () => {
    try{
        const result = await fetch(`${SERVER_URL}/member`, {
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
            document.getElementById('preview').src = member.imageUrl;
        }
    }catch (e){
        console.error(e);
        alert("서버 오류가 발생했습니다.");
        window.location.href = "/login.html";
    }
})

document.getElementById("profileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = "block";
        preview.style.width = "120px";
        preview.style.height = "120px";
        preview.style.objectFit = "cover";
        preview.style.borderRadius = "100%";
    };
    reader.readAsDataURL(file);
    isNewImage = true;
});

document.getElementById('checkButton').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value.trim();
    const confirmBtn = document.getElementById('confirmButton')
    if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return;
    }

    try {
        const result = await fetch(
            `${SERVER_URL}/member/nickname/duplicate?nickname=${encodeURIComponent(nickname)}`, {
                method: 'GET',
                credentials: 'include'
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

document.getElementById("confirmButton").addEventListener("click", async event => {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value;
    const profileFile = document.getElementById("profileInput").files[0];
    let profileImageUrl = null;

    if(isNewImage){
        const formData = new FormData();
        formData.append("file", profileFile);
        try{
            const result = await fetch(`${IMAGE_SERVER_URL}/upload`, {
                method: "POST",
                body: formData,
            });
            if(!result.ok){
                alert("이미지 업로드 실패");
                return
            }
            const data = await result.json();
            profileImageUrl = data.path;
        }catch (error) {
            alert("이미지 업로드 실패");
            console.log(error);
        }
    }

    const requestBody = {
        nickname,
        profileImageUrl
    }

    try {
        const response = await fetch(`${SERVER_URL}/member`, {
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

        isNewImage = false;

    }catch (error) {
        alert(error.response.data);
    }
});