import React, {useState, ChangeEvent, KeyboardEvent, useCallback} from "react";
import {FilterType, TodolistTasksType} from "./App";
import './App.css'
import {CommonInput} from "./CommonInput";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {ChangeFilterTdAC, ChangeTitleTdAC, RemoveTdAC} from "./state/todolists-reducer";
import {AddTaskAC, ChangeCheckedAC, ChangeTitleTaskAC, RemoveTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType={
    id:string,
    title:string,
    isDone:boolean
}



type TodolistPropsType={
    title:string,
    filter:FilterType,
    id:string
}

export const Todolist = React.memo((props:TodolistPropsType) => {

    let tasks=useSelector<AppRootState, TodolistTasksType>((state)=>state.tasks)

    let tasksForTodolist=tasks[props.id];
    if (props.filter==='completed'){
        tasksForTodolist=tasks[props.id].filter(t=> t.isDone);
    }
    if (props.filter==='active'){
        tasksForTodolist=tasks[props.id].filter(t=> !t.isDone);
    }
    let dispatch=useDispatch()

        const onChangeAllFilter =useCallback( () => {
            dispatch(ChangeFilterTdAC(props.id,'all'))
        }, [props.id])

        const onChangeActiveFilter =useCallback( () => {
            dispatch(ChangeFilterTdAC(props.id,'active'))
        }, [props.id])

        const onChangeCompletedFilter = useCallback( ()=> {
            dispatch(ChangeFilterTdAC(props.id,'completed'))
        }, [props.id])

        const onDeleteHandler=()=>{
            let action=RemoveTdAC(props.id)
            dispatch(action)
        }

        const addTask=useCallback((value:string)=>{
            dispatch(AddTaskAC(props.id, value))
        }, [props.id])
        const changeToDoListEditSpan=useCallback((value:string)=>{
            dispatch(ChangeTitleTdAC(props.id,value))
        }, [props.id])

    const removeTaskHandler=useCallback((taskId:string)=>{
        dispatch(RemoveTaskAC(props.id,taskId))
    }, [props.id])

    const changeChackedHandler=useCallback((event:ChangeEvent<HTMLInputElement>, taskId:string)=>{
        dispatch(ChangeCheckedAC(taskId,event.currentTarget.checked,props.id))
    },[props.id])
    const changeEditSpan=useCallback((value:string, taskId:string)=>{
        dispatch(ChangeTitleTaskAC(value,taskId,props.id))
    },[props.id])

    return (
        <div>
            <h3>
                <EditSpan title={props.title} changeEditSpan={changeToDoListEditSpan}/>
                <Button onClick={onDeleteHandler} color={"secondary"} variant="outlined" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </h3>
            <CommonInput label={'New task'} addItem={addTask}/>
            <ul>

                {tasksForTodolist.map((s) => {

                    return <Task removeTaskHandler={removeTaskHandler}
                                 changeChackedHandler={changeChackedHandler}
                                 changeEditSpan={changeEditSpan}
                                 task={s}/>

                })}
            </ul>
            <div>
                <Button variant={props.filter==='all' ? "contained":'text'} color="secondary" onClick={onChangeAllFilter}>All</Button>
                <Button variant={props.filter==='active' ? "contained":'text'} color="secondary" onClick={onChangeActiveFilter}>Active</Button>
                <Button variant={props.filter==='completed' ? "contained":'text'} color="secondary" onClick={onChangeCompletedFilter}>Completed</Button>
            </div>
        </div>
    );
});