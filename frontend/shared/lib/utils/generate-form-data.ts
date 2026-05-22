import { FieldValues } from "react-hook-form";


export const generateFormData = (formData : FormData  , data: FieldValues  , parentKey?: string) : FormData => {
  // 1. إذا primitive
  if (typeof data === "string" || typeof data === "number" || typeof data === "boolean" || data instanceof Date ) {
    formData.append(parentKey  || '', String(data)); 
  }
  // else if (typeof data === "string" && data?.startsWith('http://') || data?.startsWith('https://') ) {
  //     formData.append(parentKey || '', data.replace(/^"|"$/g, ''));
    
  // }
  // 2. إذا File
  else if (data instanceof File || data instanceof Blob ) {
      formData.append(parentKey || '', data);
   }
  // 3. إذا Array
  else if (Array.isArray(data)) {
        const hasFiles = data.some(item => 
          item instanceof File || 
          (item && typeof item === 'object' && 
          Object.values(item).some(val => val instanceof File || (typeof val === 'string' && (val.startsWith('http') || val.startsWith('https') ) )))
        );
        
        // If no files and parentKey exists, stringify the whole array
        if (!hasFiles && parentKey) {
          formData.append(parentKey, JSON.stringify(data));
          return formData;
        }
        
        // Process each item if there are files
        for (let i = 0; i < data.length; i++) {
          const key = parentKey ? `${parentKey}[${i}]` : String(i);
          generateFormData(formData, data[i], key);
        }
  }

  // 4. إذا Object
  else if (typeof data === "object" && data !== null) {
    // تحقق إذا object فيه files
    const hasFilesInObject = Object.values(data).some(value => {
      if (value instanceof File) return true;
      if(typeof value === 'string') return true;
      if (Array.isArray(value)) {
        return value.some(item => item instanceof File);
      }
      return false;
    });
    
    // لو مفيش files في كل الـ object: stringify مرة واحدة
    if (!hasFilesInObject && parentKey) {
      formData.append(parentKey, JSON.stringify(data));
      return formData;
    }
    
    // لو فيه files: معالجة كل property
    Object.entries(data).forEach(([key, value]) => {
          const formKey = parentKey ? `${parentKey}[${key}]` : key;           
          // لو value مش object أو array: معالجة مباشرة
          
          if ( value === null || value === undefined || 
              typeof value !== 'object' || 
              value instanceof File ||  value instanceof Blob ||
              value instanceof Date  || (typeof value === 'string' && (value.startsWith('http') || value.startsWith('https'))
            ) 
            ) {
            generateFormData(formData, value, formKey);
          }
          // لو value object عادي: استمرار recursion
          else {
            generateFormData(formData, value, formKey);
          }
    });
  }
  
  return formData;
};




  