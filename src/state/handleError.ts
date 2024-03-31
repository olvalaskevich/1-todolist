import {Dispatch} from "redux";
import {appErrorAC} from "./app-reducer";



export const handleError=(e:any, dispatch:Dispatch)=>{
    dispatch(appErrorAC({error:e.data.messages[0]}))
}
export const handleErrorOrigin=(e:string|null, dispatch:Dispatch)=>{
    dispatch(appErrorAC({error:e}))
}