import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {useActions} from "./store";

import {ErrorUtil} from "../utils/error-util";
import {Todolists} from "../features/TodolistsList/Todolists";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthActions, AuthSelectors, Login} from "../features/Auth";
import {AppSelectors} from "./index";

// export type FilterType='all' | 'active' | 'completed'
// export type TodoListTitleType = {
//     id: string,
//     title: string,
//     addedDate: string
//     order: number
// } & { filter: FilterType }
//     & { entityStatus: statusType }
//
// export type TodolistTasksType={
//     [key:string]:Array<TasksType>
// }



function App() {

    let status=useSelector(AppSelectors.statusSelector)
    let isInitialised=useSelector(AppSelectors.initSelector)
    let isAuth=useSelector(AuthSelectors.authSelector)
    let {setIsAuthTC, logOutTC}=useActions(AuthActions)


    useEffect(() => {
        setIsAuthTC()
    }, []);

    const logOutHandler=useCallback(()=>{
        logOutTC()
    },[])

    if (!isInitialised) return <CircularProgress style={{position:'absolute', top:'50%', left:'50%'}} color="primary"/>
    else return (

        <BrowserRouter>
            <div className="App" style={{height:'100vh', backgroundImage: `url("https://c.wallhere.com/photos/fb/27/1600x900_px_abstract-1526595.jpg!d")`, backgroundSize:'cover'}}>
                <Box sx={{flexGrow: 1, flexWrap:'nowrap'}} >
                    <AppBar position="static" >
                        <Toolbar style={{backgroundColor:'rgb(17,35,65)', justifyContent:'space-between'}}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Button color="inherit" onClick={logOutHandler}>{isAuth&&<span>LOGOUT</span>}</Button>


                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                </Box>

                <Container style={{display: 'flex', flexDirection:'column', flexWrap:'nowrap', width:'auto'}}>


                        <Routes>
                            <Route path={'/'} element={<Todolists/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>


                </Container>

                <ErrorUtil/>
            </div>
        </BrowserRouter>


    );
}



export default App;

