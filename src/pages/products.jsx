
import { Fragment, useEffect, useState, useRef } from "react"
import CardProduct from "../components/Fragments/CardProduct"
import Button from "../components/elements/Button"
import { getProducts } from "../services/products.service";
import { getUsername } from "../services/auth.service";


const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')) || [])
        getProducts((data) => {
            setProducts(data)
        });

    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUsername(getUsername(token));
        } else {
            window.location.href = '/login'
        }
    }, [])

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

    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('token');
        localStorage.removeItem('password');
        window.location.href = '/login';
    }

    const handleAddtoCart = (id) => {
        if (cart.find((product) => product.id === id)) {
            setCart(
                cart.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
            )
        } else {
            setCart([...cart, { id: id, qty: 1 }]);
        }
    }


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
        <Fragment>
            <div className="flex justify-end h-20 bg-blue-600 text-white px-5 items-center  font-bold my-5">
                {username}
                <Button variant="bg-black ml-5" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="flex justify-center py-5 ">
                <div className="w-3/4 flex flex-wrap">
                    {products.length > 0 && products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image}></CardProduct.Header>
                            <CardProduct.Body title={product.title}>{product.description}</CardProduct.Body>
                            <CardProduct.Footer id={product.id} handleAddtoCart={handleAddtoCart}>{product.price}</CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>
                <div className="w-1/4">
                    <h1 className="font-bold text-3xl text-blue-600 ml-5 mb-2">Cart</h1>
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
                </div>
            </div>
        </Fragment>
    )
}

export default ProductsPage