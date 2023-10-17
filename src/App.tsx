import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid'

export type FilterType='all' | 'active' | 'completed'
type TodoListTitleType={
    id:string,
    title:string,
    filter:FilterType
}



function App() {

    let todolistId1=v1();
    let todolistId2=v1();


    let [tasks,setTasks]=useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}],

        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Penсil', isDone: false}]
    });



    let [todolists, setToDoList]=useState <Array<TodoListTitleType>>([
        {id:todolistId1, title:'What to learn', filter:'all'},
        {id:todolistId2, title:'What to bye', filter:'all'}
    ])


    function removeTask(id:string, tdId:string){
      let filteredTasks=tasks[tdId].filter( t => t.id !== id )
        setTasks({...tasks, [tdId]:filteredTasks})
    }

    function addTask(title:string, tdId:string) {
        let newTask={id:v1(),title:title, isDone:false};
        setTasks({...tasks, [tdId]:[...tasks[tdId], newTask]})
    }


    function changeChacked(idChecked:string, isDone:boolean, tdId:string){
        let taskChecked=tasks[tdId].find(t=>t.id===idChecked)
        if (taskChecked) {taskChecked.isDone=isDone}
            setTasks({...tasks})
    }

    function changeFilter(value:FilterType, id:string){
        let currentTodolist=todolists.find(td=>td.id===id)
        if (currentTodolist) {currentTodolist.filter=value}
        setToDoList([...todolists])
    }


    return (
        <div className="App">

            {todolists.map((t)=>{

                let tasksForTodolist=tasks[t.id];
                if (t.filter==='completed'){
                    tasksForTodolist=tasks[t.id].filter(t=> t.isDone);
                }
                if (t.filter==='active'){
                    tasksForTodolist=tasks[t.id].filter(t=> !t.isDone);
                }


                return <Todolist title={t.title}
                                 id={t.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeChacked={changeChacked}
                                 filter={t.filter}/>
            })}

        </div>
    );
}



export default App;

