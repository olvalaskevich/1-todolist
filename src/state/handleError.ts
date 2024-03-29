import {isAxiosError} from "axios";
import {Dispatch} from "redux";
import {appErrorAC} from "./app-reducer";
import {ResponseType} from "../api/todolistsAPI";



export const handleError=(e:any, dispatch:Dispatch)=>{
    dispatch(appErrorAC(e.data.messages[0]))
}
export const handleErrorSetTasks=(e:string|null, dispatch:Dispatch)=>{
    dispatch(appErrorAC({error:e}))
}