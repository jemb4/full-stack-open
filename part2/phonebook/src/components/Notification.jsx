const Notification = ({message, isAnError}) => {
    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: `solid`,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: 'green'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: `solid`,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: 'red'
    }

    if (message === null ) return null

    return(
        <div>
            <h2 style={isAnError ? errorStyle : notificationStyle }>{message}</h2>
        </div>
    )
}

export default Notification