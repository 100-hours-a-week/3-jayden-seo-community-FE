export async function apiRequest(url, method = "GET", body = null){
    const headers = { 'Content-Type': 'application/json' };
    const accessToken = sessionStorage.getItem("accessToken");

    if(accessToken){
        headers.Authorization = `Bearer ${accessToken}`;
    }

    const options = {
        method,
        headers,
        credentials: "include",
        mode: "cors"
    }

    if(body){
        options.body = JSON.stringify(body)
    }

    let response = await fetch(url, options);

    if(response.status === 401){
        try{
            const error = await response.json();
            if (error.message?.includes("Access Token expired")) {

                const refreshResponse = await fetch(`${SERVER_URL}/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors"
                });

                if(refreshResponse.ok){
                    const newData = await refreshResponse.json();
                    const newAccessToken = newData.accessToken;
                    sessionStorage.setItem("accessToken", newAccessToken);

                    headers.Authorization = `Bearer ${newAccessToken}`;
                    options.headers = headers;
                    response = await fetch(url, options);
                }else{
                    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
                    sessionStorage.removeItem("accessToken");
                    window.location.href = "/login.html";
                    return;
                }
            }
        }catch (error){
            console.error("401 응답 처리 중 오류:", error);
            window.location.href = "/login.html";
        }
    }

    if(response.status === 204 || response.status === 201) {
        return null
    }
    const data = await response.json();
    if(!response.ok){
        throw new Error(data?.message || "요청 실패")
    }
    return data;
}