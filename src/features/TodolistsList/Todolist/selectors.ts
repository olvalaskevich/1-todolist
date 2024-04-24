import {AppRootState} from "../../../app/types";


export const tasksSelector=(state:AppRootState)=>state.tasks
export const todolistsSelector=(state:AppRootState)=>state.todolists