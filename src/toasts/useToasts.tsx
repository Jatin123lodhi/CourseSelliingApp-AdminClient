import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify"

export const useToasts = ()=>{
    
    const successToast = (msg:string)=>{

        return toast.success(msg,{position:"bottom-right"})
    }

    const errorToast = (msg: string)=>{
        return toast.error(msg,{position:"bottom-right"})
    }

    return {
        successToast,
        errorToast
    }
}

