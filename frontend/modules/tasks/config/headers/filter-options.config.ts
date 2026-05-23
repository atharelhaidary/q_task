
export const statusFilter = [
    { key: "low", label: "Low", value : 'low', fields : { key :"priority",value: 0 }   ,  type : 'status' },
    { key: "medium", label: "Medium", value : 'medium' ,  fields : { key :"priority",value: 1 } ,  type : 'status' },
    { key: "hard", label: "Hard", value : 'hard' ,  fields : { key :"priority",value: 2 } ,  type : 'status' },
    { key: 'none-status', label: 'Reset' , value : '' },
]