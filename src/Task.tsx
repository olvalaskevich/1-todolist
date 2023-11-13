import React, {ChangeEvent, useCallback} from 'react';
import {ChangeCheckedAC, ChangeTitleTaskAC, RemoveTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditSpan} from "./EditSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";


type TaskPropsType={
    removeTaskHandler:(taskId:string)=>void
    changeChackedHandler:(event:ChangeEvent<HTMLInputElement>, taskId:string)=>void
    changeEditSpan:(value:string, taskId:string)=>void
    task:TaskType

}





export const Task =React.memo( (props:TaskPropsType) => {
    console.log('span call')

    const changeEditSpan=useCallback((value:string)=>{
        props.changeEditSpan(value, props.task.id)
    }, [props.task.id, props.changeEditSpan])
    const onChangeHandler=useCallback((event:ChangeEvent<HTMLInputElement>)=>{
        props.changeChackedHandler(event, props.task.id)
    }, [props.task.id, props.changeChackedHandler])

    return (

    <li className={props.task.isDone ?'done':''} key={props.task.id}>
        <Checkbox onChange={onChangeHandler} checked={props.task.isDone} color="secondary"/>
        <EditSpan changeEditSpan={changeEditSpan} title={props.task.title}/>
        <IconButton onClick={()=>{props.removeTaskHandler(props.task.id)}}><DeleteIcon/></IconButton>
    </li>
    );
});

