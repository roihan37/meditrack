import { toast } from "sonner";

type ToastParams = {
    id?:any ,
    header: string,
    // position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
    description?: string
    duration?: number,
    
  }


export const showLoadingToast = ({
    header,
    description,
    duration
  } :ToastParams
    )=>{
    return(
        toast.loading(header, {
            position: 'bottom-right',
            description: description,
            duration: duration, 
          })
    )
} 

export const showSuccessToast = ({
    id, header,
    description,

  } :ToastParams
    )=>{
    return(
        toast.success(header, {
            id, position: 'top-right',
            description: description,
            duration: 5000, 
          })
    )
} 

export const showErrorToast = ({
    id,
    header,
    description,
    
  } :ToastParams
    )=>{
    return(
        toast.error(`${header}`, {
            id, position: 'top-right',
            description: description,
            duration: 5000
          })
    )
} 
    

