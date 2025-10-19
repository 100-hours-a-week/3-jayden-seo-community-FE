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
    const res = await fetch("http://localhost:8080/member", {
        method: 'DELETE',
        credentials: 'include'
    });

    if (res.ok) {
        alert('회원탈퇴가 완료되었습니다.');
        modal.style.display = 'none';
    } else {
        alert('탈퇴 처리 중 오류가 발생했습니다.');
    }
});