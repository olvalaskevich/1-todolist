import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch, useSelector} from "react-redux";
import {appErrorAC} from "../app/app-reducer";
import {errorSelector} from "../app/selectors";


export function ErrorUtil() {

    let open=useSelector(errorSelector)
    const dispatch=useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    };
    return (
        <Snackbar open={open!==null} autoHideDuration={5000} onClose={handleClose}>
        <Stack sx={{ width: '100%' }} style={{alignItems:'center'}}>
            <Alert severity="warning" onClose={() => {dispatch(appErrorAC({error:null}))}}>
                {open}
            </Alert>

        </Stack>
        </Snackbar>
    );
}
