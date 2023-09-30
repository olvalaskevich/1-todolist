import React from "react";
import {FilterType} from "./App";

type TaskType={
    id:number,
    title:string,
    isDone:boolean
}

type TodolistPropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:(id:number)=>void,
    changeFilter:(value:FilterType)=>void
}

export const Todolist = (props:TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((s)=>{
                    return <li>
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