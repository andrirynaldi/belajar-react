const Button = (props) => {
    const { children, variant = "bg-black", onClick = () => { }, type = "button" } = props
    return (
        <button className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`} onClick={onClick} type={type}> {children}</ button>
    )
}
export default Button