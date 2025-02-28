import Button from "../elements/Button"
import InputForm from "../elements/Input"
const FormRegister = (props) => {
    return (
        <form action="">
            <InputForm placeholder='Enter your full name' type='text' name='fullname' label='Fullname' htmlFor='fullname' />
            <InputForm placeholder='example@mail.com' type='email' name='email' label='Email' htmlFor='email' />
            <InputForm placeholder='....' type='password' name='password' label='Password' htmlFor='password' />
            <InputForm placeholder='....' type='password' name='confirmpassword' label='Confirm Password' htmlFor='confirmpassword' />
            <Button variant="bg-blue-600 w-full">Register</Button>
        </form>
    )
}

export default FormRegister