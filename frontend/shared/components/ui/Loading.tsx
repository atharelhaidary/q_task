import { mergeClasses } from "../../lib/utils/merge-classes";
const Loading = ({className}:{className?:string}) => {
    return (
      <div className="w-full  h-full flex-center flex-grow  min-h-[200px]">
   
        <div className="relative w-10 h-10 animate-spin"      style={{scale:4}}>
          {
            [
              {
                opcaity :'',
                style: 'top-0 left-0'
              },
              {
                opcaity :'opacity-70',
                style: 'top-0 right-0'
              },
              {
                opcaity :'opacity-50',
                style: 'bottom-0 right-0'
              },
              {
                opcaity :'opacity-30',
                style: 'bottom-0 left-0'
              },
            ].map((item,index)=>(
              <div key={index} className={mergeClasses(`absolute ${item.style} w-5 h-5 bg-primaryText/45  rounded-full ${item.opcaity}`,className)}></div>
            ))
          }
        </div>
      </div>
    );
};
  
export default Loading;