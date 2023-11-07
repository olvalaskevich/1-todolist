import {TodolistTasksType} from "../App";
import {v1} from "uuid";
import {AddTODOLISTActionType, RemoveTODOLISTActionType} from "./todolists-reducer";

type RemoveTaskTypeAction={
    type:'Remove task',
    tdId:string,
    id:string
}

type AddTaskTypeAction={
    type:'Add task',
    tdId:string,
    title:string

}

type ChangeCheckedTypeAction={
    type:'Change checked',
    idChecked:string,
    isDone:boolean,
    tdId:string
}

type ChangeTitleTaskActionType={
    type:'Change title of task',
    value:string,
    id:string,
    idTd:string
}

type TasksReducerActionType=RemoveTaskTypeAction | AddTaskTypeAction | ChangeCheckedTypeAction | ChangeTitleTaskActionType | AddTODOLISTActionType | RemoveTODOLISTActionType

const initialState:TodolistTasksType= {}

export const tasksReducer=(state:TodolistTasksType=initialState, action:TasksReducerActionType)=>{
    switch (action.type){
        case 'Remove task':
            return {...state, [action.tdId]:state[action.tdId].filter( t => t.id !== action.id )}

        case 'Add task':
            return {...state, [action.tdId]:[{id:v1(),title:action.title, isDone:false}, ...state[action.tdId]]}

        case 'Change checked':{
            let copyState={...state}
            let taskChecked=copyState[action.tdId].find(t=>t.id===action.idChecked)
            if (taskChecked) {taskChecked.isDone=action.isDone}
            return copyState
            }

        case 'Change title of task':{
            let changeToDoTask=[...state[action.idTd]];
            let changeTask=changeToDoTask.find((t)=>t.id===action.id);
            if (changeTask)
                changeTask.title=action.value
            return {...state, [action.idTd]: changeToDoTask}
        }
        case 'Add TODOLIST':{
            return {...state, [action.idTd]:[]}
        }

        case 'Remove TODOLIST':{
            let copyDataState={...state}
            delete copyDataState[action.id]
            return copyDataState
        }

        default:
            return state

    }
}


export const RemoveTaskAC=(tdId:string, id:string):RemoveTaskTypeAction=>{
    return {type:'Remove task', tdId: tdId, id: id}
}

export const AddTaskAC=(tdId:string, title:string):AddTaskTypeAction=>{
    return {type:'Add task', tdId: tdId, title: title}
}

export const ChangeCheckedAC=(idChecked:string, isDone:boolean, tdId:string):ChangeCheckedTypeAction=>{
    return {type:'Change checked', idChecked:idChecked, isDone: isDone, tdId: tdId}
}

export const ChangeTitleTaskAC=(value:string, id:string, idTd:string):ChangeTitleTaskActionType=>{
    return {type:'Change title of task', value:value, id: id, idTd: idTd}
}

