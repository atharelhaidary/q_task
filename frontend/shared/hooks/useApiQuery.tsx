import { useQuery, QueryKey} from '@tanstack/react-query';

type TuseApiQueryProps<TResponse> = {
  keys : QueryKey, 
  func :()=> Promise<TResponse>, 
  enabled?:  boolean
  onSuccess?: (data: TResponse) => void; 
}
 export const useApiQuery = <TResponse=unknown, E = Error> ({keys, func, enabled = true, onSuccess} :TuseApiQueryProps<TResponse>) => {

  const query =  useQuery<TResponse,E>({
    queryKey: Array.isArray(keys) ? keys : [keys],
    queryFn: async () => {
      const data = await func();
      onSuccess?.(data); 
      return data;
    },
    enabled: enabled,
  });


  return query;
};

