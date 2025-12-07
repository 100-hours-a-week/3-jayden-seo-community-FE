import {apiRequest} from "./Utils/fetchHelper.js";

const deleteBtn = document.getElementById('deleteButton');
const modal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelButton');
const confirmDeleteBtn = document.getElementById('confirmDeleteButton');


deleteBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

confirmDeleteBtn.addEventListener('click', async () => {
    try{
        const data1 = await apiRequest(`${SERVER_URL}/auth/logout`, "DELETE");
        const data2 = await apiRequest(`${SERVER_URL}/member`, "DELETE");
        sessionStorage.removeItem("accessToken");
        modal.style.display = 'none';
        window.location.href = "/";
        alert(MESSAGES.MEMBER.DELETE_ACCOUNT_SUCCESS);
    }catch (error){
        alert(MESSAGES.MEMBER.DELETE_ACCOUNT_FAIL);
    }
});