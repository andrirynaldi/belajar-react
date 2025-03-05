import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useRef, useContext } from "react"
import { DarkMode } from "../../context/DarkMode"
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPrice"
import { updateQuantity, deleteItem } from "../../redux/slices/cartSlice"


const TableCart = (props) => {
    const { products } = props
    const cart = useSelector((state) => state.cart.data)
    const { isDarkMode } = useContext(DarkMode)
    const dispatch = useTotalPriceDispatch()
    const { total } = useTotalPrice()
    const reduxDispatch = useDispatch()

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id)
                return acc + product.price * item.qty
            }, 0);
            dispatch({
                type: 'UPDATE',
                payload: {
                    total: sum,
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart, products])

    //useRef
    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = 'table-row';
        } else {
            totalPriceRef.current.style.display = 'none';
        }
    }, [cart])

    const handleQuantityChange = (id, qty) => {
        if (qty < 1) return;
        reduxDispatch(updateQuantity({ id, qty }));
    }
    const handleDeleteItem = (id) => {
        reduxDispatch(deleteItem({ id }));
    }
    return (
        <table className={`table-auto border-separate border-spacing-x-5 ${isDarkMode && "text-white"}`}>
            <thead>
                <tr>
                    <th className="text-left">Product</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 && cart.map((item) => {
                    const product = products.find((product) => product.id === item.id)
                    return (
                        <tr key={product.id}>
                            <td>{product.title.substring(0, 20) + "..."}</td>
                            <td>${product.price.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                            <td className="text-center">
                                <input
                                    type="number"
                                    value={item.qty}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    className="w-12 text-center"
                                />
                            </td>
                            <td>${(item.qty * product.price).toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                            <td className="text-center">
                                <button onClick={() => handleDeleteItem(item.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    )
                }
                )}
                <tr ref={totalPriceRef}>
                    <td colSpan={4} className="font-bold">Total price</td>
                    <td className="font-bold">${total.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableCart