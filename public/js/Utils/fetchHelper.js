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

    const response = await fetch(url, options);

    if(response.status === 204 || response.status === 201) {
        return null
    }
    const data = await response.json();
    if(!response.ok){
        throw new Error(data?.message || "요청 실패")
    }
    return data;
}