import React, {useState} from "react";
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
}

export const Todolist = (props:TodolistPropsType) => {

        let [newTaskTitle, setNewTaskTitle]=useState('')
        const onChangeInputHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
            setNewTaskTitle(event.currentTarget.value)
        }

        const onClickBtnHandler=()=>{
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeInputHandler} value={newTaskTitle}/>
                <button onClick={onClickBtnHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((s)=>{

                    return <li key={s.id}>
                        <input type="checkbox" checked={s.isDone}/>
                        <span>{s.title}</span>
                        <button onClick={ ()=>{props.removeTask(s.id)} }>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={ ()=>{props.changeFilter('all')}}>All</button>
                <button onClick={ ()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={ ()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    );
};