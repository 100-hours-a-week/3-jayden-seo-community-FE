const icon = document.getElementById("profileIcon");
const menu = document.getElementById("dropdownMenu");
const logout = document.getElementById("logoutButton");
const profile = document.getElementById("profileIcon");

profile.src = sessionStorage.getItem("profileImageUrl");

icon.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", (e) => {
    if(!icon.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});

logout.addEventListener("click", async (e) => {
    e.preventDefault();

    try{
        const response = await fetch(`${SERVER_URL}/auth/logout`, {
            method: "DELETE",
            credentials: "include"
        });

        if(response.ok) {
            alert("로그아웃 성공");
            window.location.href="/login.html";
        }else{
            alert("로그아웃 실패");
        }
    }catch(e){
        console.log(e);
        alert("로그아웃 요청 실패!");
    }
})