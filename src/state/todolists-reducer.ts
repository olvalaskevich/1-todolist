import {FilterType, TodoListTitleType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";


export type RemoveTODOLISTActionType={
    type:'Remove TODOLIST',
    id:string
}

export type AddTODOLISTActionType={
    type:'Add TODOLIST',
    td:TodolistType
}
//
// export type ChangeTitleTODOLISTActionType={
//     type:'Change title TODOLIST',
//     idTd:string,
//     value:string
// }
//
// export type ChangeFilterOfTodolistActionType={
//     type:'Change filter of todolist',
//     idTd:string,
//     filter:FilterType
// }
//
export type SetTodolistsActionType={
    type:'SET-TODOLISTS',
    todolists:Array<TodolistType>

}
export type ActionType = RemoveTODOLISTActionType |
    AddTODOLISTActionType |
    ReturnType<typeof ChangeTitleTdAC> |
    ReturnType<typeof ChangeFilterTdAC> |
    SetTodolistsActionType

const initialState:Array<TodoListTitleType>=[]

export const todolistReducer= (state:Array<TodoListTitleType>=initialState, action:ActionType)=>{
        switch (action.type){
            case 'SET-TODOLISTS':
                return action.todolists.map((tl)=>{return {...tl, filter:'all'}})
            case 'Remove TODOLIST':
                return state.filter((s)=>s.id!==action.id)
            case 'Add TODOLIST':
                return [{...action.td, filter:'all'}, ...state]
            case 'Change title TODOLIST':{
                return state.map((tl)=>tl.id===action.idTd?{...tl, title:action.value}:tl)
            }
            case 'Change filter of todolist':{
                return state.map((tl)=>tl.id===action.idTd?{...tl, filter:action.filter}:tl)
            }
            default:
               return state
        }
}

export const RemoveTdAC=(id:string):RemoveTODOLISTActionType=>{
    return {type:'Remove TODOLIST', id:id}
}
export const AddTdAC=(td:TodolistType):AddTODOLISTActionType=>{
    return {type:'Add TODOLIST', td:td}
}
export const ChangeTitleTdAC=(id:string, value:string)=>{
    return ({type:'Change title TODOLIST', idTd:id, value:value} as const)
}
export const ChangeFilterTdAC=(id:string, value:FilterType)=>{
    return ({type:'Change filter of todolist', idTd:id, filter:value} as const)
}
export const SetTodolistsAC=(td:Array<TodolistType>):SetTodolistsActionType=>{
    return {type:'SET-TODOLISTS', todolists:td}
}

export const GetTodolistsTC=()=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.getToDoLists()
            .then((res)=>{dispatch(SetTodolistsAC(res.data))})
    }
}

export const CreateTodolistsTC=(title:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.createToDoLists(title)
            .then((res)=>{dispatch(AddTdAC(res.data.data.item))})
    }
}

export const DeleteTodolistsTC=(idTd:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.deleteToDoList(idTd)
            .then((res)=>{dispatch(RemoveTdAC(idTd))})
    }
}

export const UpdateTodolistsTC=(idTd:string, title:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.updateTodolist(idTd, title)
            .then((res)=>{dispatch(ChangeTitleTdAC(idTd, title))})
    }
}



