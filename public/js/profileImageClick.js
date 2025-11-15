import {apiRequest} from "./Utils/fetchHelper.js";

const icon = document.getElementById("profileIcon");
const menu = document.getElementById("dropdownMenu");
const logout = document.getElementById("logoutButton");
const profile = document.getElementById("profileIcon");

profile.src = sessionStorage.getItem("profileImageUrl");
console.log(sessionStorage.getItem("profileImageUrl"));
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
        const data = await apiRequest(`${SERVER_URL}/auth/logout`, "DELETE");
        alert(MESSAGES.LOGOUT.SUCCESS);
        window.location.href="/login.html";
    }catch(e){
        console.log(e);
        alert(MESSAGES.LOGOUT.FETCH_FAILED);
    }
})