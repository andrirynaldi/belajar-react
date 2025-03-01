
import { Fragment, useContext, useEffect, useState } from "react"
import CardProduct from "../components/Fragments/CardProduct"
import { getProducts } from "../services/products.service";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import Navbar from "../components/Layouts/Navbar";
import { DarkMode } from "../context/DarkMode";


const ProductsPage = () => {
    const [products, setProducts] = useState([]);
const {isDarkMode, setIsDarkMode}=useContext(DarkMode)

 useLogin();

    useEffect(() => {
        getProducts((data) => {
            setProducts(data)
        });

    }, [])


 
    
    return (
        <Fragment>
            <Navbar/>
            <div className={`flex justify-center py-5 ${isDarkMode && "bg-slate-900"}`}>
                <div className="w-3/4 flex flex-wrap">
                    {products.length > 0 && products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} id={product.id}></CardProduct.Header>
                            <CardProduct.Body title={product.title}>{product.description}</CardProduct.Body>
                            <CardProduct.Footer id={product.id} >{product.price}</CardProduct.Footer>
                        </CardProduct>
                    ))}
                </div>
                <div className="w-1/4">
                    <h1 className="font-bold text-3xl text-blue-600 ml-5 mb-2">Cart</h1>
                    <TableCart products={products} />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductsPage