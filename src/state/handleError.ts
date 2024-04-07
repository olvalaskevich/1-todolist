import {Dispatch} from "redux";
import {appErrorAC} from "./app-reducer";
import {isAxiosError} from "axios";


export const handleError=(e:any, dispatch:Dispatch)=>{
    dispatch(appErrorAC({error:isAxiosError(e)?e.response?e.response.data.errorMessages[0].message:e.message:e.data?e.data.messages[0]:e}))
}
