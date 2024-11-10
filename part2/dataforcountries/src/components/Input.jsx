const Input = ({text, value, onChange}) => {
    return(
        <>
            {text}
            <input 
                value={value} 
                onChange={onChange}
            />
        </>
    )
}

export default Input