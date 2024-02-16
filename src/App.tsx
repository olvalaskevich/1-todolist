import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {CommonInput} from "./CommonInput";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {CreateTodolistsTC, GetTodolistsTC} from "./state/todolists-reducer";
import {TasksType} from "./api/todolistsAPI";
import {statusType} from "./state/app-reducer";
import {ErrorUtil} from "./error-util";

export type FilterType='all' | 'active' | 'completed'
export type TodoListTitleType = {
    id: string,
    title: string,
    addedDate: string
    order: number
} & { filter: FilterType }
    & { entityStatus: statusType }

export type TodolistTasksType={
    [key:string]:Array<TasksType>
}



function App() {


    let dispatch= useDispatch()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)
    let status=useSelector<AppRootState,statusType>((state)=>state.app.status)
    // let error=useSelector<AppRootState,string|null>((state)=>state.app.error)

    const addItem=useCallback((item:string)=>{
        // let action=AddTdAC(item)
        dispatch(CreateTodolistsTC(item) as any)
    }, [dispatch])

    useEffect(()=>{
        dispatch(GetTodolistsTC() as any)
    },[])



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
                    {status==='loading' && <LinearProgress />}
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingTop:'20px'}}>
            <CommonInput disabled={false} label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                <Grid container spacing={3} style={{paddingTop:'20px'}}>


            {todolists.map((t)=>{


                return <Grid item>
                    <Paper elevation={3} square={false} style={{padding:'10px'}}>
                        <Todolist todolist={t}/>
                    </Paper>
                    </Grid>
            })}
                    </Grid>

            </Container>
            <ErrorUtil/>
        </div>
    );
}



export default App;

