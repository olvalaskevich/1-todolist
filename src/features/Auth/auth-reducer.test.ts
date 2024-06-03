import {authReducer, logOutTC, setIsAuthTC, setLoginTC} from "./auth-reducer";

let state={
    isAuth:false
}
test('should be set login', ()=>{

    const endState=authReducer(state, setLoginTC.fulfilled(undefined,'',{
        email:'string',
        password:'string',
        rememberMe:true}))

    expect(endState.isAuth).toBe(true)

})
test('auth must be true', ()=>{

    const endState=authReducer(state, setIsAuthTC.fulfilled(undefined,''))

    expect(endState.isAuth).toBe(true)

})
test('auth must be false when logout', ()=>{

    const endState=authReducer(state, logOutTC.fulfilled(undefined,''))

    expect(endState.isAuth).toBe(false)

})