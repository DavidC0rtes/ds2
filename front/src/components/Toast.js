import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const Toast = ( {message, horizontal, vertical, open} ) => {

    if (message === null ) {
        return null
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                message={message}
                key={vertical+horizontal}
            />
        </div>
    )
}

export default Toast
