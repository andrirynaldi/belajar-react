import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin"
import Button from "../elements/Button";
import { useSelector } from "react-redux";

const Navbar = () => {
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
        <div className="flex justify-end h-20 bg-blue-600 text-white px-5 items-center  font-bold my-5">
                {username}
            <Button variant="bg-black ml-5" onClick={handleLogout}>Logout</Button>
            <div className="flex items-center bg-gray-800 p-2 rounded-md ml-5">
                <div>{totalCart}</div>
            </div>
            </div>
    )
}

export default Navbar