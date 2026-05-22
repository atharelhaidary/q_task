'use client'
import { useState} from 'react'
import Image from 'next/image';
import { Image as AntImage } from 'antd';
import { mergeClasses } from '../../lib/utils/merge-classes';
import { TImg } from '../../types';
type TLazyImgWithBlurProps = {
    src: string | Blob | File | null  | TImg[]
    alt: string;
    classNameImg?: string;
    imgStyle?: string;
    priority?: boolean
    loading?: "eager" | "lazy" | undefined;
    fetchPriority?: "high" | "low" | "auto" | undefined
    preview?: boolean;
    crossOrigin?: "anonymous" | "use-credentials" | undefined | "";
    children? :  React.ReactNode
    
}


export default function LazyImgWithBlur({ src, alt , classNameImg, imgStyle, priority, loading,fetchPriority, preview=false, children}:TLazyImgWithBlurProps) {
  const imgs = Array.isArray(src) && src?.length > 0 ? src?.map((img)=>img.url) : [src]
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
      Array(imgs.length).fill(false)
  );
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
        const newLoaded = [...prev];
        newLoaded[index] = true;
        return newLoaded;
    });
   };
   const handleImageClick = (index: number) => {
    if (preview) {
        setPreviewIndex(index);
    }
};
  return (
    <>
           {imgs.map((img,index)=>(
                    <div key={index} className={`relative overflow-hidden rounded-xl group  ${classNameImg} ${!loadedImages[index] && !classNameImg && "h-80 md:h-96"} `}  onClick={() => handleImageClick(index)}>
                        {/* ✅ Blur لكل صورة */}
                        <div className={`absolute inset-0 transition-opacity duration-500 w-full h-full ${
                            loadedImages[index] ? 'opacity-0' : 'opacity-100'
                            }`}>
                            <div className="h-full w-full  bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-xl" />
                        </div>
                        <Image
                            key={index}
                            src={ img as string}
                            alt={`${alt}-index`}
                            style={{ flexGrow: 1 }}
                            className={mergeClasses(`transition-opacity duration-500 rounded-xl  ${preview && "!border !border-gray-400"}  inset-0 w-full h-full   ${loadedImages[index] ? 'opacity-100' : 'opacity-0'}`,imgStyle)}
                            width={dimensions.width}
                            height={dimensions.height}
                            quality={75}
                            // placeholder="blur"
                            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                            onLoad={(e) => {
                                handleImageLoad(index)
                                const img = e.target as HTMLImageElement;
                                setDimensions({
                                  width: img.naturalWidth,
                                  height: img.naturalHeight
                                });
                            }}
                            crossOrigin="anonymous"
                            loading={loading}
                            priority={priority}
                            fetchPriority={fetchPriority}
                            unoptimized={true} 
                         />
                         {children}
                        
                    </div>
            ))}
          
          {preview && (
                    <AntImage.PreviewGroup
                        preview={{
                            current: previewIndex !== null ? previewIndex : 1,
                            open: previewIndex !== null,
                            onOpenChange: (open) => {
                              if (!open) setPreviewIndex(null);                          
                            },
                            onChange: (current) => {
                                setPreviewIndex(current);
                            },
                        }}
                    >
                      {imgs.map((img, index) => (
                        <AntImage 
                          key={index} 
                          src={img as string} 
                          alt={`${alt}-${index}`}
                          style={{ display: 'none' }} 
                          crossOrigin="anonymous"
                        />
                      ))}
                    </AntImage.PreviewGroup>
              )}
             
            
    </>
)}

