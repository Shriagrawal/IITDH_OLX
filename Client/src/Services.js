export const SetItemLocalStorage=(type,data)=>{
    localStorage.setItem(type,JSON.stringify(data))
}
export const GetItemLocalStorage=(type)=>{
   let data= localStorage.getItem(type);
   return data;
}
const url = 'http://127.0.0.1:8000/';

export const PostDataApiCalls = async (endpoint, data) => {
    try {
        // Fetch the CSRF token from your Django backend
       let csrfTokenResponse = await fetch('http://127.0.0.1:8000/get_csrf_token/', {
            method: 'GET',
            credentials: 'include', // Include cookies
        });
        csrfTokenResponse=await csrfTokenResponse.json();
        let csrfToken = csrfTokenResponse.csrfToken;

        // Include the CSRF token in the headers of your POST request
        const response = await fetch(url + endpoint, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken, // Include the CSRF token here
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
        return { message: 'Failed' };
    }
};

export const GetDataApiCalls=async(endpoint)=>{
    try{
        let response=await fetch(url+endpoint)
        response=await response.json();
        return response;
    }
    catch(error)
    {
     console.log(error);
     return({message:'Failed'});
    }
 }