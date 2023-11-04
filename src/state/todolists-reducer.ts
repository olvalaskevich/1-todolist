import {FilterType, TodoListTitleType} from "../App";
import {v1} from "uuid";


export type RemoveTODOLISTActionType={
    type:'Remove TODOLIST',
    id:string
}

export type AddTODOLISTActionType={
    type:'Add TODOLIST',
    title:string,
    idTd:string
}

export type ChangeTitleTODOLISTActionType={
    type:'Change title TODOLIST',
    idTd:string,
    value:string
}

export type ChangeFilterOfTodolistActionType={
    type:'Change filter of todolist',
    idTd:string,
    filter:FilterType
}
export type ActionType= RemoveTODOLISTActionType | AddTODOLISTActionType | ChangeTitleTODOLISTActionType | ChangeFilterOfTodolistActionType

export const todolistReducer= (state:Array<TodoListTitleType>, action:ActionType)=>{
        switch (action.type){
            case 'Remove TODOLIST':
                return state.filter((s)=>s.id!==action.id)
            case 'Add TODOLIST':
                return [...state, {id:action.idTd, title:action.title, filter:'all'}]
            case 'Change title TODOLIST':{
                let copyState=[...state]
                let findTodolist=copyState.find((t)=>t.id===action.idTd)
                if (findTodolist) {findTodolist.title=action.value}
                return copyState
            }
            case 'Change filter of todolist':{
                let copyState=[...state]
                let findTodolist=copyState.find((t)=>t.id===action.idTd)
                if (findTodolist) {findTodolist.filter=action.filter}
                return copyState
            }
            default:
               throw new Error('Dont understand this action')
        }
}

export const RemoveTdAC=(id:string):RemoveTODOLISTActionType=>{
    return {type:'Remove TODOLIST', id:id}
}
export const AddTdAC=(title:string):AddTODOLISTActionType=>{
    return {type:'Add TODOLIST', title:title, idTd:v1()}
}
export const ChangeTitleTdAC=(id:string, value:string):ChangeTitleTODOLISTActionType=>{
    return {type:'Change title TODOLIST', idTd:id, value:value}
}

export const ChangeFilterTdAC=(id:string, value:FilterType):ChangeFilterOfTodolistActionType=>{
    return {type:'Change filter of todolist', idTd:id, filter:value}
}