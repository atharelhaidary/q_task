import { TField } from "@/frontend/shared/types/form-field.types";


export const TASK_INPUTS : Record<string,TField> = {
  
    TITLE : {
            config : {
                name: "title",
                label: {
                 value:`Task Title`,
                },
                input: {
                type:"input",
                },
                placeholder: `Enter Task Title`,
           }
    },
    desc : {
      config : {
          name: "desc",
          label: {
          value:`Task Description`,
          },
          input: {
             type: "textarea",
             rows : 4
          },
          placeholder: `Enter Description`,
     }
    },
     PRIORITY : {
        config :{
            name: "priority",
            label: {
              value:`Priority`
            },
            input: {
              type:"select",
              options:[
                 { label : 'Low', value : 0 },
                 { label : 'Medium', value : 1 },
                 { label : 'Hard', value : 2 }
               ], 
            },
            placeholder: `Select Priority`,
        }
    },
    STATUS : {
      config :{
          name: "status",
          label: {
            value:`Status`
          },
          input: {
            type:"select",
            options:[
               { label : 'To Do', value : 0 },
               { label : 'In Progress', value : 1 },
               { label : 'Done', value : 2 }
             ], 
          },
          placeholder: `Select Priority`,
      }
  },
    TAGS : {
      config : {
          name: "tags",
          label: {
            value:`Tags`,
          },
          input: {
            type:"input",
          },
          placeholder: `Enter Tags eg: frontend, backend ....`,
     }
},
} 