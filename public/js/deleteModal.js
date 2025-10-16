const deleteBtn = document.getElementById('deleteButton');
const modal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelButton');
const confirmDeleteBtn = document.getElementById('confirmDeleteButton');

/* 모달 열기 */
deleteBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

/* 취소 클릭 시 닫기 */
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

/* 확인 클릭 시 탈퇴 요청 */
// confirmDeleteBtn.addEventListener('click', async () => {
//     const res = await fetch('/user/delete', {
//         method: 'DELETE',
//         headers: {
//             'Authorization': 'Bearer ' + sessionStorage.getItem('token')
//         }
//     });
//     const result = await res.json();
//     if (result.success) {
//         alert('회원탈퇴가 완료되었습니다.');
//         location.href = '/'; // 홈으로 리다이렉트
//     } else {
//         alert('탈퇴 처리 중 오류가 발생했습니다.');
//     }
// });