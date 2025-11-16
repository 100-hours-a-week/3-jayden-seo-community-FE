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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    const nickname = document.getElementById("nickname").value;
    const profileFile = profileInput.files[0];

    if (password !== passwordConfirm) {
        alert(MESSAGES.MEMBER.PASSWORD_MISMATCH);
        return;
    }

    // 임시 프로필 사진 이미지 url
    let profileImageUrl = "https://example.com/default-profile.png";
    let uploadUrl;

    // if(profileFile){
    //     const formData = new FormData();
    //     formData.append("file", profileFile);
    //     try{
    //         const result = await fetch(`${IMAGE_SERVER_URL}/upload`, {
    //             method: "POST",
    //             body: formData,
    //         });
    //         if(!result.ok){
    //             alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
    //             return
    //         }
    //         const data = await result.json();
    //         profileImageUrl = data.path;
    //     }catch (error) {
    //         alert(MESSAGES.ERROR.IMAGE_UPLOAD_FAIL);
    //         console.log(error);
    //     }
    // }
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
        alert(MESSAGES.SIGNUP.SUCCESS);
        window.location.href = "/login.html";
    }catch(err){
        console.log(err);
        alert(err.message);
        window.location.href = "/register.html";
    }
})