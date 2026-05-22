type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type TApiFetchOptionsProps<T> = {
    url: string;
    method?: HttpMethod;
    data?: T | FormData;
    headers?: HeadersInit;
    credentials?: 'include' | 'same-origin' | 'omit';
    cache?: 'no-store' |'no-cache';
  }