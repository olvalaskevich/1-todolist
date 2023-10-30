import React, {ChangeEvent, useState} from 'react';
import {Input} from "@mui/material";

type EditSpanPropsType={
    title:string,
    changeEditSpan:(value:string)=>void
}



export const EditSpan = (props:EditSpanPropsType) => {

    let [onDouble, setonDouble]=useState(false)
    let [value, setValue]=useState('')

    const onDoubleClickHandler=()=>{
        setValue(props.title)
        setonDouble(true)
    }
    const onBlurInputHandler=()=>{
        setonDouble(false)
        props.changeEditSpan(value)
    }

    const onChangeInputHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)

    }

    return (
        <>
            {onDouble ?
                <Input onBlur={onBlurInputHandler} onChange={onChangeInputHandler} value={value} autoFocus color={"secondary"}/>
                :
                <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
            }
        </>
    );
};

