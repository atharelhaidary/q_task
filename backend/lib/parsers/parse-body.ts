import { NextRequest } from "next/server";
export async function parseBody<T = Record<string, any>>(request: NextRequest) : Promise<T  | Record<string, any>> {
  const contentType = request.headers.get('Content-Type') || "";
  let body: Record<string, any> = {};
  
  if (contentType.includes('application/json')) {
    body = await request.json();
    return body as T;
  } 
  
  else if (contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    
    for (const [key, value] of formData.entries()) {
            const match = key.match(/^(\w+)(?:\[(\d*)\])?\[(\w+)\]$/);
            if (match) {
              const [, baseKey, index, field] = match;
              
              if (index === undefined) {
                // image[url] - بدون index
                if (!body[baseKey]) body[baseKey] = {};
                body[baseKey][field] = value;
              } else {
                // attachments[0][url] - مع index
                const numIndex = index ? parseInt(index, 10) : 0;
                if (!body[baseKey]) body[baseKey] = [];
                if (!body[baseKey][numIndex]) body[baseKey][numIndex] = {};
                body[baseKey][numIndex][field] = value;
              }
            }
            
            else if (key.endsWith('[]')) {
              const baseKey = key.slice(0, -2); 
              if (!body[baseKey]) {
                body[baseKey] = [];
              }
              body[baseKey].push(value);
            }
            
            else {
              if(typeof value === 'string'){
                try{
                  const parsed = JSON.parse(value)
                  body[key] = parsed
                }catch{
                  // const numValue = Number(value);
                  // body[key] = !isNaN(numValue) ? numValue : value;
                  body[key] = value
                }
              }else{
                body[key] = value
              }
           }
        }
    return body  as T;
  }
  
  return {};
}


