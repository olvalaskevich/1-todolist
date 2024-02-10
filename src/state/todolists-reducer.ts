import {FilterType, TodoListTitleType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {AppActionsTypes} from "./store";
import {appErrorAC, appStatusAC, statusType} from "./app-reducer";


export type RemoveTODOLISTActionType={
    type:'Remove TODOLIST',
    id:string
}

export type AddTODOLISTActionType={
    type:'Add TODOLIST',
    td:TodolistType
}

export type SetTodolistsActionType={
    type:'SET-TODOLISTS',
    todolists:Array<TodolistType>

}
export type TasksActionType = RemoveTODOLISTActionType |
    AddTODOLISTActionType |
    ReturnType<typeof ChangeTitleTdAC> |
    ReturnType<typeof ChangeFilterTdAC> |
    SetTodolistsActionType | ReturnType<typeof ChangeStatusTodolistAC>

const initialState:Array<TodoListTitleType>=[]

export const todolistReducer= (state:Array<TodoListTitleType>=initialState, action:TasksActionType)=>{
        switch (action.type){
            case 'SET-TODOLISTS':
                return action.todolists.map((tl)=>{return {...tl, filter:'all', entityStatus:'idle'}})
            case 'Remove TODOLIST':
                return state.filter((s)=>s.id!==action.id)
            case 'Add TODOLIST':
                return [{...action.td, filter:'all', entityStatus: 'idle'}, ...state]
            case 'Change title TODOLIST':{
                return state.map((tl)=>tl.id===action.idTd?{...tl, title:action.value}:tl)
            }
            case 'Change filter of todolist':{
                return state.map((tl)=>tl.id===action.idTd?{...tl, filter:action.filter}:tl)
            }
            case 'CHANGE STATUS OF TODOLIST':
                return state.map((tl)=>tl.id===action.idTd?{...tl, entityStatus:action.statusTd}:tl)
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
export const ChangeStatusTodolistAC=(idTd:string, statusTd:statusType)=>{
    return({type:'CHANGE STATUS OF TODOLIST', idTd:idTd, statusTd:statusTd} as const)
}

export const GetTodolistsTC=():AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(appStatusAC('loading'))
        todolistsAPI.getToDoLists()
            .then((res)=>{dispatch(SetTodolistsAC(res.data))
                dispatch(appStatusAC('idle'))})
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const CreateTodolistsTC=(title:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(appStatusAC('loading'))
        todolistsAPI.createToDoLists(title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(AddTdAC(res.data.data.item))
                dispatch(appStatusAC('success'))}
                else {
                    dispatch(appErrorAC(res.data.messages[0]))
                    dispatch(appStatusAC('idle'))
                }
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const DeleteTodolistsTC=(idTd:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC(idTd, 'loading'))
        todolistsAPI.deleteToDoList(idTd)
            .then((res)=>{
                dispatch(RemoveTdAC(idTd))
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}
export const UpdateTodolistsTC=(idTd:string, title:string):AppActionsTypes=>{
    return (dispatch)=>{
        dispatch(ChangeStatusTodolistAC(idTd, 'loading'))
        todolistsAPI.updateTodolist(idTd, title)
            .then((res)=>{
                if (res.data.resultCode===0){
                dispatch(ChangeTitleTdAC(idTd, title))
                dispatch(ChangeStatusTodolistAC(idTd, 'success'))}
                else {
                    dispatch(appErrorAC(res.data.messages[0]))
                    dispatch(ChangeStatusTodolistAC(idTd, 'success'))
                }
            })
            .catch((err)=>{dispatch(appErrorAC(err))})
    }
}



