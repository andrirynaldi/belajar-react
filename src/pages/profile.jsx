import Navbar from "../components/Layouts/Navbar"
import { useLogin } from "../hooks/useLogin"

const ProfilePage = () => {
    const username = useLogin()
    return (
        <div>
            <Navbar />
            <h1>Profile</h1>
            <h1>Username : {username }</h1>
        </div>
    )
}
export default ProfilePage