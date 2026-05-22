

import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
let token;
let response;
token =""

export const apiAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// الحصول على الهيدرات (مثل fetch)
const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Accept-Language': 'en',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Interceptor للطلب
apiAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // const headers = getHeaders(token);
    // Object.entries(headers).forEach(([key, value]) => {
    //   config.headers[key] = value;
    // });
    // const specificCookies = [
    //   'accessToken=eyJhbGciOiJIUzI1NiIs...',
    //   'lang=en'
    // ].join('; ');
    // config.headers['Cookie'] = specificCookies;
    
    // // منع إرسال الكوكيز التلقائي
    // config.withCredentials = false;
    // // لو FormData، نشيل Content-Type (axios يضبطها auto)
    // if (config.data instanceof FormData) {
    //   delete config.headers['Content-Type'];
    // }
    
    return config;
  },
  (error) => Promise.reject(error)
);

//Interceptor للرد (مع refetch token)
apiAxios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        return Promise.reject(error);
      }
)
