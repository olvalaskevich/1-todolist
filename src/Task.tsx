import React, {ChangeEvent, useCallback} from 'react';

import {Checkbox, IconButton} from "@mui/material";
import {EditSpan} from "./EditSpan";
import DeleteIcon from "@mui/icons-material/Delete";

import {TaskStatuses, TasksType} from "./api/todolistsAPI";


type TaskPropsType={
    removeTaskHandler:(taskId:string)=>void
    changeChackedHandler:(event:ChangeEvent<HTMLInputElement>, taskId:string)=>void
    changeEditSpan:(value:string, taskId:string)=>void
    task:TasksType
    disabled:boolean

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

    <li className={props.task.status ?'done':''} key={props.task.id}>
        <Checkbox disabled={props.disabled} onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed} color="secondary"/>
        <EditSpan disabled={props.disabled} changeEditSpan={changeEditSpan} title={props.task.title}/>
        <IconButton disabled={props.disabled} onClick={()=>{props.removeTaskHandler(props.task.id)}}><DeleteIcon/></IconButton>
    </li>
    );
});

