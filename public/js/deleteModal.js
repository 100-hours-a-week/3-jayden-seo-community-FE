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
        const data = await apiRequest(`${SERVER_URL}/member`, "DELETE");
        alert('회원탈퇴가 완료되었습니다.');
        modal.style.display = 'none';
    }catch (error){
        alert(error.message);
    }
});