
export const sortTitle =[
    { key: 'az', label: '(A-Z) ↑', value : "az", fields : {key:"sorting", value :{ sortBy :  "title",sortOrder : 1} }, type : 'sortTitle' },
    { key: 'za', label: '(Z-A) ↓', value : "za", fields : {  key:"sorting", value :{ sortBy :  "title",sortOrder : -1} } ,  type : 'sortTitle' },
    { key: 'none-name', label: 'Reset' , value : '' },
]
export const sortDate = [
    { key: 'oldest', label: 'Oldest ↑', value : "oldest", fields : { key:"sorting", value :{ sortBy :  "createdAt",sortOrder : 1} } ,  type : 'sortDate' },
    { key:'newest', label: 'Newest ↓', value : "newest",  fields : { key:"sorting", value :{ sortBy :  "createdAt",sortOrder : -1} },  type : 'sortDate' },
    { key: 'none-date', label: 'Reset' , value : '' },
]