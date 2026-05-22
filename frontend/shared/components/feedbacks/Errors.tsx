import LazyImgWithBlur from "../ui/LazyImgWithBlur";
import SmoothBtn from "../ui/SmoothBtn";
import errorImage from '../../assets/images/feedbacks/error.webp'
type TErrorCompProps = {
    message?: string
    onClick? : ()=>void
}

const Errors = ({message,onClick}:TErrorCompProps) => {
    return (
        <div  className="feedback px-10 flex-grow">
            <LazyImgWithBlur
                src={errorImage.src}
                preview={false} 
                alt="erroImg" 
                priority={true} 
                loading="eager"
                fetchPriority="high"
            />
            <h3>Ooops!!s</h3>
            <p >{message}</p>
            <SmoothBtn 
                // type="text"
                htmlType="button"
                title="try again"
                btnStyle="!px-20"
                onClick={ onClick }
            />
        </div>
    )
}
export default Errors;