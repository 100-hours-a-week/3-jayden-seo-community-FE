const icon = document.getElementById("profileIcon");
const menu = document.getElementById("dropdownMenu");
const logout = document.getElementById("logoutButton");

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
        const response = await fetch("http://localhost:8080/auth/logout", {
            method: "DELETE",
            credentials: "include"
        });

        if(response.ok) {
            alert("로그아웃 성공");
        }else{
            alert("로그아웃 실패");
        }
    }catch(e){
        console.log(e);
        alert("로그아웃 요청 실패!");
    }
})