let accessToken = null;

export function setAccessToken(token){
    accessToken = token;
}

export function getAccessToken(){
    return accessToken;
}

export async function apiRequest(url, method = "GET", body = null){
    const options = {
        method,
        credentials: "include",
        mode: "cors"
    }

    if(body){
        options.headers = { 'Content-Type': 'application/json' }
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