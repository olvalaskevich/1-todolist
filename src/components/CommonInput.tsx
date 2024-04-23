import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppSelectors} from '../app'

type CommonInputPropsType={
    label:string,
    addItem:(item:string)=>void,
    disabled:boolean
}


export const CommonInput = React.memo( (props:CommonInputPropsType) => {


    let [newTaskTitle, setNewTaskTitle]=useState('')
    let [error, setError]=useState<string|null>(null)
    let addTaskError=useSelector(AppSelectors.errorSelector)
    const onChangeInputHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setNewTaskTitle(event.currentTarget.value)
        if (error!==null)
        setError(null)

    }

    const onClickBtnHandler= ()=>{

    if (newTaskTitle.trim()!==''){
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }
    else {setError("Invalid value")}
}



    const onKeyEnter=(event:KeyboardEvent<HTMLInputElement>)=>{

        if (event.key==='Enter'&& newTaskTitle.trim()!==''){
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
        if (event.key==='Enter'&& newTaskTitle.trim()==='') {
            setError("Invalid value")
        }
    }



    return (
        <div>
            <TextField error={!!error}
                       id="outlined-basic"
                       label={props.label}
                       color={'primary'}
                       variant="outlined"
                       onKeyPress={onKeyEnter}
                       onChange={onChangeInputHandler}
                       value={newTaskTitle}
                       disabled={props.disabled}
            style={{backgroundColor:'rgb(25,118,210)', borderRadius:'5px', border:'2px solid rgb(17,35,65)'}}

            />
            <IconButton disabled={props.disabled} onClick={onClickBtnHandler} color={"primary"} style={{border:'2px solid rgb(17,35,65)', margin:'5px'}}>
                <AddOutlined/>
            </IconButton>
            {error && <div className={'textError'}>Invalid value</div>}
        </div>
    );
});

