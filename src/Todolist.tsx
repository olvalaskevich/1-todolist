import React from "react";

type TaskType={
    id:number,
    title:string,
    isDone:boolean
}

type TodolistPropsType={
    title:string,
    tasks:Array<TaskType>,
    removeTask:Function
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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};