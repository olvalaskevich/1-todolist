import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {useActions} from "../../app/store";
import {Navigate} from "react-router-dom";
import {AuthActions, AuthSelectors} from "./index";
import {statusSelector} from "../../app/selectors";
import {FormikErrorType} from "./types";

// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }


export const Login = () => {
    let status=useSelector(statusSelector)
    let auth=useSelector(AuthSelectors.authSelector)
    let {setLoginTC}=useActions(AuthActions)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password){
                errors.password = 'Required'
            }
            return errors
        },
        onSubmit: values => {
            setLoginTC(values)

        },
    })

    if (auth) return <Navigate to={'/'}/>
    else
        return (
    <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel >
                    <p style={{color:'white'}}>To log in get registered
                        <a style={{color:'black'}} href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p style={{color:'white'}}>or use common test account credentials:</p>
                    <p style={{color:'white'}}>Email: free@samuraijs.com</p>
                    <p style={{color:'white'}}>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email && <div style={{color:'red'}}>{formik.errors.email}</div>}

                    <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password && <div style={{color:'red'}}>{formik.errors.password}</div>}

                    <FormControlLabel label={'Remember me'} control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>}/>

                    <Button disabled={status==='loading'} type={'submit'} variant={'contained'} color={'primary'} style={{border:'2px solid rgb(17,35,65)'}}>
                        Login
                    </Button>

                </FormGroup>
            </FormControl>
            </form>
        </Grid>
    </Grid>
        )
}