import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterType} from "./App";
import './App.css'
import {CommonInput} from "./CommonInput";
import {EditSpan} from "./EditSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType={
    id:string,
    title:string,
    isDone:boolean
}



type TodolistPropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:(id:string, tdId:string)=>void,
    changeFilter:(value:FilterType, id:string)=>void,
    addTask:(title:string, id:string)=>void,
    changeChecked:(idChecked:string, isDone:boolean, tdId:string)=>void,
    filter:FilterType,
    id:string
    deleteTodolist:(tdId:string)=>void,
    changeEditSpan:(value:string, id:string, idTd:string)=>void,
    changeToDoListEditSpan:(value:string,idTd:string)=>void
}

export const Todolist = (props:TodolistPropsType) => {

        const onChangeAllFilter = () => {
        props.changeFilter('all', props.id)

        }

        const onChangeActiveFilter = () => {
        props.changeFilter('active', props.id)
        }

        const onChangeCompletedFilter = () => {
        props.changeFilter('completed', props.id)
        }

        const onDeleteHandler=()=>{
            props.deleteTodolist(props.id)
        }

        const addTask=(value:string)=>{
            props.addTask(value, props.id )
        }
        const changeToDoListEditSpan=(value:string)=>{
            props.changeToDoListEditSpan(value,props.id)
        }



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
                {props.tasks.map((s)=>{

                    const removeTaskHandler=()=>{
                        props.removeTask(s.id, props.id)
                    }

                    const changeChackedHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                        props.changeChecked(s.id,event.currentTarget.checked, props.id)
                    }
                    const changeEditSpan=(value:string)=>{
                        props.changeEditSpan(value, s.id, props.id)
                    }

                    return <li className={s.isDone ?'done':''} key={s.id}>
                        <Checkbox onChange={changeChackedHandler} checked={s.isDone} color="secondary"/>
                        <EditSpan changeEditSpan={changeEditSpan} title={s.title}/>
                        <IconButton onClick={removeTaskHandler}><DeleteIcon/></IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter==='all' ? "contained":'text'} color="secondary" onClick={onChangeAllFilter}>All</Button>
                <Button variant={props.filter==='active' ? "contained":'text'} color="secondary" onClick={onChangeActiveFilter}>Active</Button>
                <Button variant={props.filter==='completed' ? "contained":'text'} color="secondary" onClick={onChangeCompletedFilter}>Completed</Button>
            </div>
        </div>
    );
};