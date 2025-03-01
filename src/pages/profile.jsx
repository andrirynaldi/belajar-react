import { useContext } from "react"
import Navbar from "../components/Layouts/Navbar"
import { useLogin } from "../hooks/useLogin"
import { DarkMode } from "../context/DarkMode"

const ProfilePage = () => {
    const {isDarkMode}=useContext(DarkMode)
    const username = useLogin()
    return (
        <div className={`${isDarkMode && "bg-slate-900 text-white"}`}>
            <Navbar />
            <h1>Profile</h1>
            <h1>Username : {username }</h1>
        </div>
    )
}
export default ProfilePage