import {AppRootState} from "./store";


export const statusSelector=(state:AppRootState)=>state.app.status
export const initSelector=(state:AppRootState)=>state.app.isInitialized