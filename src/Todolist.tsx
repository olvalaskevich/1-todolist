import React, {ChangeEvent, useCallback, useEffect} from "react";
import {FilterType, TodolistTasksType} from "./App";
import './App.css'
import {CommonInput} from "./CommonInput";
import {EditSpan} from "./EditSpan";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {
    ChangeFilterTdAC,
    DeleteTodolistsTC,
    UpdateTodolistsTC
} from "./state/todolists-reducer";
import {
    AddTasksTC,
    DeleteTasksTC,
    SetTasksTC, UpdateTasksStatusTC, UpdateTasksTC
} from "./state/tasks-reducer";
import {Task} from "./Task";
import {TaskStatuses} from "./api/todolistsAPI";






type TodolistPropsType={
    title:string,
    filter:FilterType,
    id:string
}

export const Todolist = React.memo((props:TodolistPropsType) => {

    let dispatch=useDispatch()

    useEffect(()=>{
        dispatch(SetTasksTC(props.id) as any)
    },[])

    let tasks=useSelector<AppRootState, TodolistTasksType>((state)=>state.tasks)

    let tasksForTodolist=tasks[props.id];

    if (props.filter==='completed'){
        tasksForTodolist=tasks[props.id].filter(t=> t.status);
    }
    if (props.filter==='active'){
        tasksForTodolist=tasks[props.id].filter(t=> !t.status);
    }

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
            // let action=RemoveTdAC(props.id)
            dispatch(DeleteTodolistsTC(props.id) as any)
        }

        const addTask=useCallback((value:string)=>{
            dispatch(AddTasksTC(props.id, value) as any)
        }, [props.id])

        const changeToDoListEditSpan=useCallback((value:string)=>{
            dispatch(UpdateTodolistsTC(props.id,value) as any)
        }, [props.id])

    const removeTaskHandler=useCallback((taskId:string)=>{
        dispatch(DeleteTasksTC(props.id,taskId) as any)
    }, [props.id])

    const changeChackedHandler=useCallback((event:ChangeEvent<HTMLInputElement>, taskId:string)=>{

        let status=event.currentTarget.checked? TaskStatuses.Completed:TaskStatuses.New
        dispatch(UpdateTasksStatusTC(props.id, taskId, status) as any)
    },[props.id])

    const changeEditSpan=useCallback((value:string, taskId:string)=>{
        dispatch(UpdateTasksTC(props.id, taskId, value) as any)
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