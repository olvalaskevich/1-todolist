import {FilterType, TodoListTitleType} from "../App";
import {v1} from "uuid";
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

export type SetTodolistsActionType={
    type:'SET-TODOLISTS',
    todolists:Array<TodolistType>

}
export type ActionType = RemoveTODOLISTActionType |
    AddTODOLISTActionType |
    ChangeTitleTODOLISTActionType |
    ChangeFilterOfTodolistActionType |
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
               return state
        }
}

export const RemoveTdAC=(id:string):RemoveTODOLISTActionType=>{
    return {type:'Remove TODOLIST', id:id}
}
export const AddTdAC=(td:TodolistType):AddTODOLISTActionType=>{
    return {type:'Add TODOLIST', td:td}
}
export const ChangeTitleTdAC=(id:string, value:string):ChangeTitleTODOLISTActionType=>{
    return {type:'Change title TODOLIST', idTd:id, value:value}
}
export const ChangeFilterTdAC=(id:string, value:FilterType):ChangeFilterOfTodolistActionType=>{
    return {type:'Change filter of todolist', idTd:id, filter:value}
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



