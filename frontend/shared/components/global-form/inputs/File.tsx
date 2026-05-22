'use client';
import { Upload } from 'antd';
import {  useEffect, useState} from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import SmoothBtn from '../../ui/SmoothBtn';
import LazyImgWithBlur from '../../ui/LazyImgWithBlur';
import { TInputs } from '@/frontend/shared/types/form-field.types';
import { generateFileReader } from '@/frontend/shared/lib';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { mergeClasses } from '@/frontend/shared/lib/utils/merge-classes';


export default function File({ field,originalControl,}:TInputs) {
  const { name, input, label } = field.config;
  const {  accept, multiple, class : classInput } = input;
  const watcheImgs = useWatch({
    control: originalControl,
    name:  name 
  });
  const methods = useFormContext();
  const { setValue } = methods;
  const [fileLists, setFileLists] = useState<any[]>([])
  const [copyOriginalSingleImg, setCopyOriginalSingleImg ] = useState<any[]>([])

 

const handleOnChange = async({ files, deletedFile }: { files?: any; deletedFile?: FieldValues }) => {
    const selectedFiles = deletedFile ? [...files,deletedFile] : files?.fileList 
    const validFiles = selectedFiles.filter(f => f.action !== 'delete' && !f.id);
    const newSelected = await Promise.all(
              validFiles.map(async(file:any,index:number)=>{
                let url = file?.url || file?.originFileObj
                const name = !multiple ? `Event Banner`: `attachment ${index+1}`
                if(file?.id && file?.action !=='delete' ){
                  return{
                        name,
                        id: file.id,
                        action : 'keep',
                        url :url,
                        thumbUrl : await generateFileReader(url)
                  }
                }else if(file?.id && file?.action ==='delete' ){
                  return{
                    name,
                    id: file?.id,
                    action : 'delete',
                    url :url,
                    thumbUrl : await generateFileReader(url)
                   }
                }else {
                  return{
                    name,
                    action : multiple? 'add' : copyOriginalSingleImg?.length === 0 ? "add":'replace',
                    id:!multiple && copyOriginalSingleImg?.length >0 ? copyOriginalSingleImg[0]?.id : null,
                    url :url,
                    thumbUrl : await generateFileReader(url)
                  }
                }  
              })
    )

    if(selectedFiles && selectedFiles.length>0){
      setFileLists(newSelected);
      //set api image
      if (!multiple) {
        setValue(name, newSelected[0] , { 
          shouldValidate: true,
          shouldDirty: true 
        });
      } else {
        setValue(name, newSelected, { 
          shouldValidate: true,
          shouldDirty: true 
        });
      }
    }
    return false;
};
//handle delete image
const handleRemoveFile = (file:FieldValues) => {
  file.action = 'delete';
  handleOnChange({files:fileLists,deletedFile:file})
}

  //set images from database ===> defaultValues
  useEffect(() => {
    if(watcheImgs){
    const isImgsArry = Array.isArray(watcheImgs) ? watcheImgs : [watcheImgs]
    isImgsArry.forEach((_,index)=>{
          if(isImgsArry[index]?.url !== null){
            const processedImages = isImgsArry.map((img,index)=> ({
              name: !multiple ? `Event Banner`: `attachment ${index+1}`,
              url: img?.url,
              action: 'keep' as const,
              id: img?.id,
            }));
            if(fileLists.length === 0 ){
                 setFileLists(processedImages)
                 if(!multiple){
                  setCopyOriginalSingleImg(processedImages)
                 }
            }

          }else {
            setFileLists([])
          }
       })
    }
  }, [watcheImgs]);
  return (
      <>
              <Upload
                listType="picture"
                name={name}
                id={name}
                showUploadList={{
                  showRemoveIcon: false,
                  showPreviewIcon: false,
                }}
                fileList={fileLists}
                accept={accept}
                maxCount={multiple ? undefined : 1}
                multiple={multiple}
                onChange={(compyFileLists)=>{
                  handleOnChange({files:compyFileLists})
                }}
                beforeUpload={(file) => {
                  return false;
                }}
                 itemRender={(originNode, file) => {
                  return null
                 }}
                onPreview={(file)=>{
                  return null;

                }}
                className="!bg-transparent"
              >
                  <SmoothBtn htmlType="button"  btnStyle={mergeClasses("hover:!bg-transparent w-full",classInput)} >
                          <div className="flex-center gap-2  flex-grow">
                            <UploadOutlined className="block text-2xl" />
                            <span className="font-light">upload {label.value}</span>
                          </div>
                  </SmoothBtn>
              </Upload>
              <div className="max-h-80 overflow-y-auto scrollbar-style  w-full">
                  {
                        fileLists?.length > 0 && fileLists?.map((file,index)=>{
                          //url image 
                          const fileUrl = typeof file.url === "string" ? file.url : file.thumbUrl 
                          const isCloudinaryUrl = typeof fileUrl === 'string' && fileUrl.includes('cloudinary.com');  
                          if(file.action === 'delete') return null;
                          return(
                          <div 
                            key={`${file.name}-${index}`}
                            className={`relative w-full flex justify-between items-center border border-white py-4 rounded-xl mb-3
                                        hover:!bg-white  hover:cursor-pointer
                                      
                                        transition-transform duration-400 ease-in-out group
                                        
                            `}
                            onClick={(e)=>{
                              e.preventDefault()
                              e.stopPropagation();
                            }}
                          >
                            <div className="flex items-center gap-2 group">
                                <LazyImgWithBlur src={fileUrl}   preview={true} classNameImg="w-[70px] h-[70px]" imgStyle="object-contain" alt={`event-attchment-${index}`}  />
                                <span className={`group-hover:text-blue-500`}>
                                      {file.name}
                                </span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <DeleteOutlined
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation();
                                      handleRemoveFile(file);
                                    }}
                                    className="cursor-pointer group-hover:fill-blue-500"
                                />
                                {/* <FaEye  
                                    className="cursor-pointer group-hover:fill-blue-500" 
                                    onClick={(e:React.MouseEvent<SVGElement>)=>handleClick(e,file)}
                                /> */}
                            </div>
                          </div>
                          )
                        })
                  }
              </div>

       </>
  );
}



