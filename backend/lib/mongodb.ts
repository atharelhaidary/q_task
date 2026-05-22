import mongoose from "mongoose";
type MongooseCache = {
  conn : typeof mongoose | null
  promise : Promise<typeof mongoose> | null
}
declare global {
  // eslint-disable-next-line no-var
  var mongoose : MongooseCache | undefined;
}
mongoose.set('strictQuery', true);
mongoose.set('runValidators', true);
const MONGOOSE_URI = process.env.MONGODB_URI
const cache : MongooseCache = global.mongoose || {conn:null, promise:null}
if( !global.mongoose ){
  global.mongoose = cache
}
// :Promise<typeof mongoose> 
export async function connectDB ():Promise<typeof mongoose> {
   if(cache.conn) {
    return cache.conn
   }
   if(!cache.promise){
        if(!MONGOOSE_URI){
          throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
        }
        cache.promise = mongoose.connect(MONGOOSE_URI).then((m)=>m)
   }
   try {
    cache.conn = await cache.promise
    return cache.conn
   }catch(error ){
    console.log('error',error)

     cache.promise =null
     throw error;
   }
  
}

export default connectDB;