import {apiRequest} from "../../Utils/fetchHelper.js";

const profileInput = document.getElementById("profileInput");
const preview = document.getElementById("preview");

profileInput.addEventListener("change", (e) => {
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
});

document.getElementById("registerForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const passwordConfirmError = document.getElementById("passwordConfirmError");
    const passwordError = document.getElementById("passwordError");
    const nicknameError = document.getElementById("nicknameError");
    const emailError = document.getElementById("emailError");

    const email = document.getElementById("email").value;
    const nickname = document.getElementById("nickname").value;
    const profileFile = profileInput.files[0];
    initError(passwordError, passwordConfirmError, nicknameError, emailError);

    if (password !== passwordConfirm) {
        // alert(MESSAGES.MEMBER.PASSWORD_MISMATCH);
        passwordConfirmError.textContent = "비밀번호가 일치하지 않습니다.";
        return;
    }

    // 임시 프로필 사진 이미지 url
    let profileImageUrl = "https://example.com/default-profile.png";
    let uploadUrl;


    if(profileFile){
        try{
            const res = await fetch("https://16jdujbqqc.execute-api.ap-northeast-2.amazonaws.com/upload/presigned", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    fileName: profileFile.name,
                    fileType: profileFile.type,
                    folder: "profile",
                })
            })
            const data = await res.json();
            uploadUrl = data.uploadUrl;
            profileImageUrl = data.key;

            await fetch(uploadUrl, {
                method: "PUT",
                headers: {"Content-Type": profileFile.type},
                body: profileFile
            });
        }catch(e){
            alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
        }
    }

    const requestBody = {
        email,
        password,
        passwordConfirm,
        nickname,
        profileImageUrl
    }

    try{
        const data = await apiRequest(`${SERVER_URL}/member/register`, "POST", requestBody);
        window.location.href = "/login.html";
    }catch(err){

        initError(passwordError, passwordConfirmError, nicknameError, emailError);
        const errorMessage = err.message;
        console.log(err.field);
        switch (err.field){
            case "email":
                setError(errorMessage, emailError);
                break;
            case "password":
                setError(errorMessage, passwordError);
                break;
            case "passwordConfirm":
                setError(errorMessage, passwordConfirmError);
                break;
            case "nickname":
                setError(errorMessage, nicknameError);
                break;
        }
    }
})

function setError(errorMessage, ErrorFiled){
    ErrorFiled.textContent = errorMessage;
}

function initError(e1, e2, e3, e4){
    e1.textContent = "";
    e2.textContent = "";
    e3.textContent = "";
    e4.textContent = "";
}

