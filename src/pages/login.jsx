import FormLogin from "../components/Fragments/FormLogin"
import AuthLayout from "../components/Layouts/AuthLayout"


const LoginPage = () => {
    return (
        <AuthLayout titlePage="Login" type="login">
            <FormLogin />
        </AuthLayout>
    )
}

export default LoginPage