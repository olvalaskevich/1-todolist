import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {CommonInput} from "./CommonInput";
import {
    AppBar,
    Box,
    Button, CircularProgress,
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
import {Todolists} from "./Todolists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./Login";

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

    let status=useSelector<AppRootState,string>((state)=>state.app.status)
    let dispatch= useDispatch()
    let isInitialised=useSelector<AppRootState,boolean>((state)=>state.app.isInitialized)

    useEffect(() => {
        dispatch()
    }, []);

    if (!isInitialised) return <CircularProgress color="secondary"/>
    else return (

        <BrowserRouter>
            <div className="App">
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                </Box>
                <Container fixed>

                    <Grid container spacing={3} style={{paddingTop: '20px'}}>
                        <Routes>
                            <Route path={'/'} element={<Todolists/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>
                    </Grid>

                </Container>
                <ErrorUtil/>
            </div>
        </BrowserRouter>


    );
}



export default App;

