"use client"
import {  QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
type TQueryClientProviderrProps  =  {
    children : React.ReactNode 
}
 const QueryClientProviderr = ({children}:TQueryClientProviderrProps) => {
   
   //use useState to not make infinite refetch
   const [queryClient] = useState(()=>{
    return new QueryClient({
         defaultOptions: {
           queries: {
            staleTime: 0, 
            gcTime: 0,
            // staleTime: 5 * 60 * 1000,
            // gcTime: 10 * 60 * 1000,
             retry: false,
             refetchOnWindowFocus: false,
             refetchOnMount: true,
             refetchOnReconnect: true, 
            //  networkMode: 'offlineFirst',
           },
           mutations: {
             retry: 0,
            //  networkMode: 'offlineFirst',
           },
           
         },
       })
     }
 )

    return(
        <QueryClientProvider client={queryClient}>
               {children}
               {/* {process.env.NODE_ENV !== 'production' && ( */}
               <ReactQueryDevtools initialIsOpen={false} />
               {/* )} */}
        </QueryClientProvider>

    )
}
export default QueryClientProviderr;