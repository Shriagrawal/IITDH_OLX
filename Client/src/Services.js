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
        console.log(data);
        // Fetch the CSRF token from your Django backend
        const response = await fetch(url + endpoint, {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.log(error);
        return { message: 'Failed' };
    }
};

export const GetDataApiCalls=async(endpoint)=>{
    try{
        let response=await fetch(url+endpoint)
        console.log(response);
        response=await response.json();
        return response;
    }
    catch(error)
    {
     console.log(error);
     return({message:'Failed'});
    }
 }