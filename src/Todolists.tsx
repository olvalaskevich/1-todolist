import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import React, {useCallback, useEffect, useMemo} from "react";
import {CommonInput} from "./CommonInput";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootState} from "./state/store";
import {TodoListTitleType} from "./App";
import {CreateTodolistsTC, GetTodolistsTC} from "./state/todolists-reducer";
import {Navigate} from "react-router-dom";
import {setIsAuthTC} from "./state/auth-reducer";



export const Todolists=React.memo(()=>{

    let dispatch= useDispatch<AppDispatchType>()
    let todolists=useSelector<AppRootState, Array<TodoListTitleType>>((state)=>state.todolists)

    let isAuth=useSelector<AppRootState,boolean>((state)=>state.auth.isAuth)


    const addItem=useCallback((item:string)=>{
        // let action=AddTdAC(item)
        dispatch(CreateTodolistsTC(item) as any)
    }, [dispatch])

    useEffect(()=>{
        if (isAuth){
        dispatch(GetTodolistsTC())}
    },[])

    if (!isAuth) return <Navigate to={'/login'}/>
    else
        return (
            <>
                <Grid container style={{paddingTop: '20px'}}>
                    <CommonInput disabled={false} label={'New ToDoList'} addItem={addItem}/>
                </Grid>
                {todolists.map((t) => {

                    return <Grid item>
                        <Paper elevation={3} square={false} style={{padding: '10px'}}>
                            <Todolist todolist={t}/>
                        </Paper>
                    </Grid>
                })}


            </>)
}
)