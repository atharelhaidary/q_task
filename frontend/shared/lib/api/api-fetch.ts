 import { TApiResponse } from "../../../../shared/types";
 import { TApiFetchOptionsProps } from "../../types";
 import { getServerCookie } from "../cookies/get-server-cookie";

 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

 export async function apiFetch<TResponse = unknown, TBody = unknown>({url, method = 'GET', data, headers = {}, credentials,cache}: TApiFetchOptionsProps<TBody>): Promise<TApiResponse<TResponse>> {
 
  
    let response;
    const isFormData = data instanceof FormData; 
   // header
   const getHeaders = (token : string) => {
     return {
       'Accept': 'application/json',
       'Accept-Language': "en",
      //  ...(token && { Authorization: `Bearer ${token}` }),
       ...headers
     }
   } 
   const fetchData = async() => {
     const accessToken = await getServerCookie("accessToken") || ""
      response = await fetch(`${BASE_URL}/${url}`,{
       method,
       headers: getHeaders(accessToken),
       ...(credentials && { credentials }),
       ...(cache && { cache }),
       ...(data && method !== 'GET'
         ? {
             body: isFormData ? data : JSON.stringify(data)
           }
         : {})
     });
     return response
   }
   response = await fetchData();
   //auto refresh;
   const refreshTokenHeader = response.headers.get('x-refresh-token');
   if (refreshTokenHeader === 'true') {
     await  fetchData();
   }
  const responseData = await response.json().catch(() => null);
    
  if (!response.ok) {
      throw responseData || { success: false, message: `HTTP ${response.status}` };
  }
  
  return responseData as TApiResponse<TResponse>;
 }



