import React from 'react'

const ErrorFeedback = ({ error, resetErrorBoundary }) => {
    return <>
        <div>{error.message}</div>
        <button
            type="button"
            class="btn btn-danger"
            onClick={resetErrorBoundary}>
            Retry
        </button>
    </>
}

export default ErrorFeedback