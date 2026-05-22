
import { z } from 'zod';

export const formatZodErrors = (error:  z.ZodError): Record<string, string> => {
  const formatted: Record<string, any> = {};
  
  if (error instanceof z.ZodError) {
    error.issues.forEach((issue: { path: any; message: any; }) => {
    const path = issue.path;

    if (path.length === 0) {
      formatted['_root'] = issue.message;
      return;
    }
  

    if (path.length === 1) {
      const [key] = path;
      formatted[key as string] = issue.message;
      return;
    }

    let current = formatted;
   
    for (let i = 0; i < path.length; i++) {
      const key = path[i] as string;
      
      if (i === path.length - 1) {
        current[key] = issue.message;
      } else {
        const nextKey = path[i + 1];
        const isNextIndex = typeof nextKey === 'number' || /^\d+$/.test(nextKey as string);
        
        if (isNextIndex) {
          if (!current[key] || !Array.isArray(current[key])) {
            current[key] = [];
          }
          
          const index = parseInt(nextKey as string, 10);
          if (!current[key][index]) {
            current[key][index] = i === path.length-2 ? issue.message : {} ;
          }
          
          current = current[key][index];
          i++; 
        } else {
          if (!current[key] || typeof current[key] !== 'object' || Array.isArray(current[key])) {
            current[key] = {};
          }
          current = current[key];
        }
      }
    }
  })
    // استخدم issues (ليس errors)
    // error.issues.forEach((issue) => {
    //   const path = issue.path.join('.');
    //   const key = path || '_root';
    //   formatted[key] = issue.message;
    // });
  } 
  // else if (error instanceof Error) {
  //   formatted._error = error.message;
  // } else {
  //   formatted._error = 'Unknown validation error';
  // }
  
  return formatted;
};

