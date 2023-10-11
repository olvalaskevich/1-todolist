import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterType} from "./App";

type TaskType={
    id:string,
    title:string,
    isDone:boolean
}

type TodolistPropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:(id:string)=>void,
    changeFilter:(value:FilterType)=>void,
    addTask:(title:string)=>void
    changeChacked:(idChecked:string, isDone:boolean)=>void
}

export const Todolist = (props:TodolistPropsType) => {

        let [newTaskTitle, setNewTaskTitle]=useState('')
        const onChangeInputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
            setNewTaskTitle(event.currentTarget.value)
        }

        const onClickBtnHandler=()=>{
            if (newTaskTitle.trim()!=='')
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }

        const onKeyEnter=(event:KeyboardEvent<HTMLInputElement>)=>{
            if (event.key==='Enter'&& newTaskTitle.trim()!==''){
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
            }
        }

        const onChangeAllFilter = () => {
        props.changeFilter('all')
        }

        const onChangeActiveFilter = () => {
        props.changeFilter('active')
        }

        const onChangeCompletedFilter = () => {
        props.changeFilter('completed')
        }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onKeyPress={onKeyEnter} onChange={onChangeInputHandler} value={newTaskTitle}/>
                <button onClick={onClickBtnHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((s)=>{

                    const removeTaskHandler=()=>{
                        props.removeTask(s.id)
                    }

                    const changeChackedHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                        props.changeChacked(s.id,event.currentTarget.checked)
                    }

                    return <li key={s.id}>
                        <input onChange={changeChackedHandler} type="checkbox"/>
                        <span>{s.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onChangeAllFilter}>All</button>
                <button onClick={onChangeActiveFilter}>Active</button>
                <button onClick={onChangeCompletedFilter}>Completed</button>
            </div>
        </div>
    );
};