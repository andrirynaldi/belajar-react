import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"


const TableCart = (props) => {
    const { products } = props
    const cart = useSelector((state) => state.cart.data)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id)
                return acc + product.price * item.qty
            }, 0);
            setTotal(sum)
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


    return (
        <table className="table-auto border-separate border-spacing-x-5">
        <thead>
            <tr>
                <th className="text-left">Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total</th>
            </tr>
        </thead>
        <tbody>
            {products.length > 0 && cart.map((item) => {
                const product = products.find((product) => product.id === item.id)
                return (
                    <tr key={product.id}>
                        <td>{product.title.substring(0, 20) + "..."}</td>
                        <td>${product.price.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                        <td className="text-center">{item.qty}</td>
                        <td>${(item.qty * product.price).toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
                    </tr>
                )
            }
            )}
            <tr ref={totalPriceRef}>
                <td colSpan={3} className="font-bold">Total price</td>
                <td className="font-bold">${total.toLocaleString('id-ID', { styles: 'currency', currency: 'USD' })}</td>
            </tr>
        </tbody>
    </table>
    )
}

export default TableCart