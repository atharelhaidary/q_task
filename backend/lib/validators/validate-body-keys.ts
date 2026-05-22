import { Model } from "mongoose";
export const validateBodyKeys = <T> (schema : Model<T>, body :Record<string,any>) : string[] | false  => {
    const allowedKeys =  Object.keys(schema.schema.obj);
    const invalidKeys = Object.keys(body).filter((key)=> !allowedKeys.includes(key));
    return Array.isArray(invalidKeys) && invalidKeys.length > 0  ?  invalidKeys :  false
}