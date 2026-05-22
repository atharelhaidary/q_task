export const isEmptyBody = (body:Record<string,any>) : boolean => {
   if(typeof body === "object" && Object.keys(body).length === 0)  return true
   if (!body) return true;
   return false
}