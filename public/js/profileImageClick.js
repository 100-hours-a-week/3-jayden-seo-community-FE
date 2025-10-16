const icon = document.getElementById("profileIcon");
const menu = document.getElementById("dropdownMenu");

icon.addEventListener("click", () => {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
});

document.addEventListener("click", (e) => {
    if(!icon.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
    }
});