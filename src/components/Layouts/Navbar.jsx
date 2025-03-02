import { useContext, useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin"
import Button from "../elements/Button";
import { useSelector } from "react-redux";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice } from "../../context/TotalPrice";

const Navbar = () => {
    const { isDarkMode, setIsDarkMode } = useContext(DarkMode)
     const {total}=useTotalPrice()
    const username = useLogin()
       const handleLogout = () => {
            localStorage.removeItem('isLogin');
            localStorage.removeItem('token');
            localStorage.removeItem('password');
            window.location.href = '/login';
    }
    
    const [totalCart, setTotalCart] = useState(0)
    const cart = useSelector((state) => state.cart.data)
    
    useEffect(() => {
        const sum = cart.reduce((acc, item) => {
           return acc + item.qty
        },0)
        setTotalCart(sum)
    },[cart])
    
    return (
        <div className="flex justify-end h-20 bg-blue-600 text-white px-5 items-center  font-bold">
                {username}
            <Button variant="bg-black ml-5" onClick={handleLogout}>Logout</Button>
            <div className="flex items-center bg-gray-800 p-2 rounded-md ml-5">
                <div>{totalCart} | ${ total}</div>
            </div>
            <Button variant="bg-black ml-5" onClick={()=>setIsDarkMode(!isDarkMode)}>{isDarkMode?'Light':'Dark'}</Button>
            </div>
    )
}

export default Navbar