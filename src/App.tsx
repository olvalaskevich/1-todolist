import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid'
import {CommonInput} from "./CommonInput";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export type FilterType='all' | 'active' | 'completed'
export type TodoListTitleType={
    id:string,
    title:string,
    filter:FilterType
}

export type TodolistTasksType={
    [key:string]:Array<TaskType>
}

function App() {

    let todolistId1=v1();
    let todolistId2=v1();


    let [tasks,setTasks]=useState<TodolistTasksType>({
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
        setTasks({...tasks, [tdId]:[newTask, ...tasks[tdId]]})
    }

    function changeChacked(idChecked:string, isDone:boolean, tdId:string){
        let taskChecked=tasks[tdId].find(t=>t.id===idChecked)
        if (taskChecked) {taskChecked.isDone=isDone}
            setTasks({...tasks})
    }
    function changeEditSpan(value:string, id:string, idTd:string){

        let changeToDoTask=[...tasks[idTd]];
        let changeTask=changeToDoTask.find((t)=>t.id===id);
        if (changeTask)
            changeTask.title=value
        setTasks({...tasks})
    }



    function changeFilter(value:FilterType, id:string){
        let currentTodolist=todolists.find(td=>td.id===id)
        if (currentTodolist) {currentTodolist.filter=value}
        setToDoList([...todolists])
    }

    function deleteTodolist (tdId:string){
        let delList=todolists.filter(t=>t.id!==tdId)
        setToDoList(delList)
        delete tasks[tdId]
        setTasks({...tasks})
    }

    function addItem(item:string){
        let newTodolistId=v1();
        let newToDoList:TodoListTitleType={id:newTodolistId, title:item, filter:'all'};
        setToDoList([newToDoList, ...todolists])
        setTasks({[newTodolistId]:[],...tasks })
    }
    function changeToDoListEditSpan(value:string, idTd:string){

        let changeToDoList=todolists.find((t)=>t.id===idTd);
        if (changeToDoList)
            changeToDoList.title=value
        setToDoList([...todolists])
    }



    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingTop:'20px'}}>
            <CommonInput label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'20px'}}>
            {todolists.map((t)=>{

                let tasksForTodolist=tasks[t.id];
                if (t.filter==='completed'){
                    tasksForTodolist=tasks[t.id].filter(t=> t.isDone);
                }
                if (t.filter==='active'){
                    tasksForTodolist=tasks[t.id].filter(t=> !t.isDone);
                }


                return <Grid item>
                    <Paper elevation={3} square={false} style={{padding:'10px'}}>
                    <Todolist title={t.title}
                                 id={t.id}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeChecked={changeChacked}
                                 filter={t.filter}
                                 deleteTodolist={deleteTodolist}
                                 changeEditSpan={changeEditSpan}
                                 changeToDoListEditSpan={changeToDoListEditSpan}
                />
                    </Paper>
                    </Grid>
            })}
                    </Grid>
            </Container>
        </div>
    );
}



export default App;

