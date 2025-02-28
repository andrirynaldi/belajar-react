import Button from "../elements/Button"
const CardProduct = (props) => {
    const { children } = props
    return (
        <div className="w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow mx-2 my-2 flex flex-col justify-between">
            {children}
        </div>
    )
}

const Header = (props) => {
    const { image } = props
    return (
        <a href="">
            <img src={image} alt="sepatu002" className="p-8 rounded-t-lg" />
        </a>
    )
}



const Body = (props) => {
    const { children, title } = props
    return (
        <div className="px-5 pb-5 h-full">
            <a href="">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-white">{title}</h5>
            </a>
            <p className="text-white text-sm">{children}</p>
        </div>
    )
}

const Footer = (props) => {
    const { children, handleAddtoCart, id } = props
    return (
        <div className="flex items-center w-xs mb-2 justify-between px-5">
            <span className="text-xl font-bold text-white">Rp{children.toLocaleString('id-ID', { styles: 'currency', currency: 'IDR' })}</span>
            <Button variant='bg-blue-600' onClick={() => handleAddtoCart(id)}>Add to Chart</Button>
        </div>
    )
}

CardProduct.Header = Header
CardProduct.Body = Body
CardProduct.Footer = Footer

export default CardProduct