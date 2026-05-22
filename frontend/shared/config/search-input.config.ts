import { TField } from "@/frontend/shared/types/form-field.types";


export const SEARCH_INPUT : Record<string,TField> = {
  
    TITLE : {
            config : {
                name: "search",
                label: {
                 value:``,
                },
                input: {
                   type:"input",
                },
                placeholder: `Search ....`,
           }
    },
} 