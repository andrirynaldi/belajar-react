import { useEffect, useRef, useState } from "react"
import Button from "../elements/Button"
import InputForm from "../elements/Input"
import { getLogin } from "../../services/auth.service"
const FormLogin = (props) => {
    const [loginFailed, setLoginFailed] = useState("")
    const usernameRef = useRef(null)
    const handleLogin = (event) => {
        event.preventDefault()
        // localStorage.setItem('isLogin', true)
        // localStorage.setItem('email', event.target.email.value)
        // localStorage.setItem('password', event.target.password.value)
        // console.log('login success');

        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        getLogin(data, (status, res) => {
            if (status) {
                localStorage.setItem('token', res)
                window.location.href = '/products'
            } else {
                setLoginFailed(res.response.data)
            }
        })
    }


    useEffect(() => {
        usernameRef.current.focus()
    }, [])
    return (
        <form onSubmit={handleLogin}>
            <InputForm placeholder='john doe' type='text' name='username' label='Username' htmlFor='username' ref={usernameRef} />
            <InputForm placeholder='....' type='password' name='password' label='Password' htmlFor='password' />
            <Button variant="bg-blue-600 w-full" type='submit'>Login</Button>
            {loginFailed && (<p className="text-red-600 text-center mt-5">{loginFailed}</p>)}
        </form>
    )
}

export default FormLogin