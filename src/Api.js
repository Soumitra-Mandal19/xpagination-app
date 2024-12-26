const Api_url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchData = async() => {
    const response = await fetch(Api_url);
    const data = await response.json();
    return data;
}