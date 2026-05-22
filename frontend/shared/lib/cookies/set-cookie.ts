"use server"
import { cookies } from "next/headers";

//set cookie
type TCookieOptions = {
    maxAge?: number ;     
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    path?: string;
    secure?: boolean;
    expires?: Date ;
 }
export async function setCookie (name : string,value : string ,options:TCookieOptions ={}) {
  if (!name) {
    throw new Error('Cookie name is required');
  }
  const cookieStore = await cookies();
  const { 
     maxAge,
     httpOnly = false, 
     secure = process.env.NODE_ENV === 'production', 
     sameSite = 'strict',
     path = "/",
     expires
    } = options
    
  cookieStore.set(name, value, {
    httpOnly, 
    secure,
    sameSite,
    ...(maxAge !== undefined && { maxAge }),
    ...(expires !== undefined && { expires }),
    path
  });
}  