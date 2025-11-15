window.SERVER_URL = "http://localhost:8080";
window.IMAGE_SERVER_URL = "http://localhost:3000";
window.IMAGE_SERVEL_URL2 = "https://d16mf2kdusm8xr.cloudfront.net/";

window.MESSAGES = {
    LOGIN: {
        INPUT_REQUIRED: "이메일과 비밀번호를 모두 입력해주세요!",
        SUCCESS: "로그인 성공!",
    },
    LOGOUT: {
        SUCCESS: "로그아웃 성공!",
        FETCH_FAILED: "로그아웃 요청 실패!"
    },
    SIGNUP: {
        PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다!",
        SUCCESS: "회원가입이 완료되었습니다!"
    },
    MEMBER:{
        NICKNAME_REQUIRED: "닉네임을 입력해주세요.",
        NICKNAME_CHECK_ERROR: "닉네임 확인 중 오류가 발생했습니다!",
        NICKNAME_AVAILABLE: "사용 가능한 닉네임입니다!",
        NICKNAME_UNAVAILABLE: "이미 존재하는 닉네임입니다!",
        PASSWORD_MISMATCH: "비밀번호가 일치하지 않습니다!",
        UPDATE_PROFILE_SUCCESS: "회원정보가 성공적으로 변경되었습니다.",
        UPDATE_PASSWORD_SUCCESS: "비밀번호가 성공적으로 변경되었습니다.",
        DELETE_ACCOUNT_SUCCESS: "회원탈퇴가 완료되었습니다.",
        DELETE_ACCOUNT_FAIL: "회원탈퇴 중 오류가 발생했습니다."
    },
    POST: {
        TITLE_CONTENT_REQUIRED: "제목과 내용 모두 입력해주세요.",
        CREATE_SUCCESS: "게시글이 성공적으로 작성되었습니다.",
        UPDATE_SUCCESS: "게시글이 성공적으로 수정되었습니다.",
        DELETE_CONFIRMATION: "게시글을 삭제하시겠습니까?",
        DELETE_SUCCESS: "게시글이 삭제되었습니다.",
        FETCH_FAILED: "게시물 정보를 가져올 수 없습니다.",
    },
    COMMENT: {
        REQUIRED: "댓글을 입력해주세요!",
        UPDATE_SUCCESS: "댓글이 수정되었습니다!",
        DELETE_CONFIRMATION: "댓글을 삭제하시겠습니까?",
        DELETE_SUCCESS: "댓글이 삭제되었습니다.",
    },
    LIKE: {
        REQUEST_FAILED: "좋아요 요청 실패!",
    },
    ERROR: {
        IMAGE_UPLOAD_FAIL: "이미지 업로드 실패!",
        INVALID_ACCESS: "잘못된 접근입니다",
    }
}

