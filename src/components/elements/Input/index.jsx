import Label from './Label'
import Input from './Input'

const InputForm = (props) => {
    const { htmlFor, label, type, name, placeholder } = props
    return (
        <div className="mb-6">
            <Label htmlFor={htmlFor}>{label}</Label>
            <Input type={type} placeholder={placeholder} name={name} />
        </div>
    )
}
export default InputForm