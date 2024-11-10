const Button = ({handleClick, message}) => {
    return(
        <>
            <button onClick={handleClick}>{message}</button>
        </>
    )
}

export default Button