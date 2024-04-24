import React, {ChangeEvent, useCallback} from "react";
import '../../../app/App.css'
import {CommonInput} from "../../../components/CommonInput";
import {EditSpan} from "../../../components/EditSpan";
import {Box, Button, CircularProgress} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";
import {useActions, useAppDispatch} from "../../../app/store";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolistsAPI";
import {TasksActions, TodolistsActions, TodolistSelectors} from "./index";
import {TodolistPropsType} from "./types";


// type TodolistPropsType={
//     todolist:TodoListTitleType
// }

export const Todolist = React.memo((props:TodolistPropsType) => {

    let dispatch=useAppDispatch()

    let disabled=props.todolist.entityStatus==='loading'

    let tasks=useSelector(TodolistSelectors.tasksSelector)

    let tasksForTodolist=tasks[props.todolist.id];
    let {DeleteTasksTC,
        AddTasksTC,
        UpdateTasksTC,
        UpdateTasksStatusTC}=useActions(TasksActions)
    let {ChangeFilterTdAC,
        DeleteTodolistsTC,
        UpdateTodolistsTC}=useActions(TodolistsActions)

    if (props.todolist.filter==='completed'){
        tasksForTodolist=tasks[props.todolist.id].filter(t=> t.status);
    }
    if (props.todolist.filter==='active'){
        tasksForTodolist=tasks[props.todolist.id].filter(t=> !t.status);
    }


        const onChangeAllFilter =useCallback( () => {
            ChangeFilterTdAC({id:props.todolist.id,value:'all'})
        }, [props.todolist.id])

        const onChangeActiveFilter =useCallback( () => {
            ChangeFilterTdAC({id:props.todolist.id,value:'active'})
        }, [props.todolist.id])

        const onChangeCompletedFilter = useCallback( ()=> {
            ChangeFilterTdAC({id:props.todolist.id,value:'completed'})
        }, [props.todolist.id])

        const onDeleteHandler=()=>{
            // let action=RemoveTdAC(props.id)
            DeleteTodolistsTC({idTd:props.todolist.id}) 
        }

        const addTask=useCallback((value:string)=>{
            AddTasksTC({idTd:props.todolist.id, title:value})
        }, [props.todolist.id])

        const changeToDoListEditSpan=useCallback((value:string)=>{
            dispatch(UpdateTodolistsTC({idTd:props.todolist.id,title:value}))
        }, [props.todolist.id])

    const removeTaskHandler=useCallback((taskId:string)=>{
        DeleteTasksTC({idTd:props.todolist.id, idTask:taskId})
    }, [props.todolist.id])

    const changeChackedHandler=useCallback((event:ChangeEvent<HTMLInputElement>, taskId:string)=>{

        let status=event.currentTarget.checked? TaskStatuses.Completed:TaskStatuses.New
        UpdateTasksStatusTC({idTd:props.todolist.id, idTask:taskId, status})
    },[props.todolist.id])

    const changeEditSpan=useCallback((value:string, taskId:string)=>{
        UpdateTasksTC({idTd:props.todolist.id, idTask:taskId, value})
    },[props.todolist.id])

    const filterButton=(disable:boolean, filter:'all'|'active'|'completed', title:string, onClickHundler:()=>void)=>{
        return <Button disabled={disable} variant={props.todolist.filter === filter ? "contained" : 'text'} onClick={onClickHundler}>
            {title}
               </Button>
    }


    return (
        <div>
            <h3>
                <Box display={'flex'} justifyContent={'space-between'} position={'relative'}>
                <EditSpan disabled={disabled} title={props.todolist.title} changeEditSpan={changeToDoListEditSpan}/>
                <Button style={{position:'absolute', left:'150px'}} onClick={onDeleteHandler} disabled={disabled} variant="outlined"  startIcon={<DeleteIcon/>}>
                    Delete
                </Button>
                </Box>
            </h3>
            <CommonInput disabled={disabled} label={'New task'} addItem={addTask}/>
            <ul>
                {props.todolist.entityStatus==='loading' && <CircularProgress/>}

                {tasksForTodolist.map((s) => {



                    return <Task removeTaskHandler={removeTaskHandler}
                                 changeChackedHandler={changeChackedHandler}
                                 changeEditSpan={changeEditSpan}
                                 task={s}
                                 disabled={disabled}/>

                })}
            </ul>
            <div>
                {filterButton(disabled, 'all', 'All', onChangeAllFilter)}
                {filterButton(disabled, 'active', 'Active', onChangeActiveFilter)}
                {filterButton(disabled, 'completed', 'Completed', onChangeCompletedFilter)}
            </div>
        </div>
    );
});