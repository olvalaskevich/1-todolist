import React, {ChangeEvent, useCallback} from "react";
import {TodolistTasksType, TodoListTitleType} from "../../../app/App";
import '../../../app/App.css'
import {CommonInput} from "../../../components/CommonInput";
import {EditSpan} from "../../../components/EditSpan";
import {Button, CircularProgress} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootState} from "../../../app/store";
import {
    ChangeFilterTdAC,
    DeleteTodolistsTC,
    UpdateTodolistsTC
} from "./todolists-reducer";
import {
    AddTasksTC,
    DeleteTasksTC,
    UpdateTasksStatusTC,
    UpdateTasksTC
} from "./tasks-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolistsAPI";
import {TodolistSelectors} from "./index";


type TodolistPropsType={
    todolist:TodoListTitleType
}

export const Todolist = React.memo((props:TodolistPropsType) => {

    let dispatch=useDispatch<AppDispatchType>()

    let disabled=props.todolist.entityStatus==='loading'

    let tasks=useSelector(TodolistSelectors.tasksSelector)

    let tasksForTodolist=tasks[props.todolist.id];

    if (props.todolist.filter==='completed'){
        tasksForTodolist=tasks[props.todolist.id].filter(t=> t.status);
    }
    if (props.todolist.filter==='active'){
        tasksForTodolist=tasks[props.todolist.id].filter(t=> !t.status);
    }


        const onChangeAllFilter =useCallback( () => {
            dispatch(ChangeFilterTdAC({id:props.todolist.id,value:'all'}))
        }, [props.todolist.id])

        const onChangeActiveFilter =useCallback( () => {
            dispatch(ChangeFilterTdAC({id:props.todolist.id,value:'active'}))
        }, [props.todolist.id])

        const onChangeCompletedFilter = useCallback( ()=> {
            dispatch(ChangeFilterTdAC({id:props.todolist.id,value:'completed'}))
        }, [props.todolist.id])

        const onDeleteHandler=()=>{
            // let action=RemoveTdAC(props.id)
            dispatch(DeleteTodolistsTC({idTd:props.todolist.id}) as any)
        }

        const addTask=useCallback((value:string)=>{
            dispatch(AddTasksTC({idTd:props.todolist.id, title:value}) as any)
        }, [props.todolist.id])

        const changeToDoListEditSpan=useCallback((value:string)=>{
            dispatch(UpdateTodolistsTC({idTd:props.todolist.id,title:value}) as any)
        }, [props.todolist.id])

    const removeTaskHandler=useCallback((taskId:string)=>{
        dispatch(DeleteTasksTC({idTd:props.todolist.id, idTask:taskId}) as any)
    }, [props.todolist.id])

    const changeChackedHandler=useCallback((event:ChangeEvent<HTMLInputElement>, taskId:string)=>{

        let status=event.currentTarget.checked? TaskStatuses.Completed:TaskStatuses.New
        dispatch(UpdateTasksStatusTC({idTd:props.todolist.id, idTask:taskId, status}) as any)
    },[props.todolist.id])

    const changeEditSpan=useCallback((value:string, taskId:string)=>{
        dispatch(UpdateTasksTC({idTd:props.todolist.id, idTask:taskId, value}) as any)
    },[props.todolist.id])

    return (
        <div>
            <h3>
                <EditSpan disabled={disabled} title={props.todolist.title} changeEditSpan={changeToDoListEditSpan}/>
                <Button onClick={onDeleteHandler} disabled={disabled} color={"secondary"} variant="outlined" startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
            </h3>
            <CommonInput disabled={disabled} label={'New task'} addItem={addTask}/>
            <ul>
                {props.todolist.entityStatus==='loading' && <CircularProgress color="secondary"/>}

                {tasksForTodolist.map((s) => {



                    return <Task removeTaskHandler={removeTaskHandler}
                                 changeChackedHandler={changeChackedHandler}
                                 changeEditSpan={changeEditSpan}
                                 task={s}
                                 disabled={disabled}/>

                })}
            </ul>
            <div>
                <Button disabled={disabled} variant={props.todolist.filter==='all' ? "contained":'text'} color="secondary" onClick={onChangeAllFilter}>All</Button>
                <Button disabled={disabled} variant={props.todolist.filter==='active' ? "contained":'text'} color="secondary" onClick={onChangeActiveFilter}>Active</Button>
                <Button disabled={disabled} variant={props.todolist.filter==='completed' ? "contained":'text'} color="secondary" onClick={onChangeCompletedFilter}>Completed</Button>
            </div>
        </div>
    );
});