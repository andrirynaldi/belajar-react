import { useEffect, useRef } from "react"
import Button from "../elements/Button"
import InputForm from "../elements/Input"
const FormLogin = (props) => {
    const handleLogin = (event) => {
        event.preventDefault()
        localStorage.setItem('isLogin', true)
        localStorage.setItem('email', event.target.email.value)
        localStorage.setItem('password', event.target.password.value)
        console.log('login success');
        window.location.href = '/products'
    }
    const emailRef = useRef(null)

    useEffect(() => {
        emailRef.current.focus()
    }, [])
    return (
        <form onSubmit={handleLogin}>
            <InputForm placeholder='example@mail.com' type='email' name='email' label='Email' htmlFor='email' ref={emailRef} />
            <InputForm placeholder='....' type='password' name='password' label='Password' htmlFor='password' />
            <Button variant="bg-blue-600 w-full" type='submit'>Login</Button>
        </form>
    )
}

export default FormLogin