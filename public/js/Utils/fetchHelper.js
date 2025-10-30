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
    console.log(options);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if(!response.ok){
        throw new Error(data?.message || "요청 실패")
    }
    return data;
}