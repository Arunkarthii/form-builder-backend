module.exports = {
    errorHandlerFunction: (res, error) => {
        if (error.status) {
            if (error.status < 500) {
                return res.clientError({
                    ...error.error,
                    statusCode: error.status,
                })
            } else {
                return res.internalServerError({ ...error.error })
            }
        } else {
            return res.internalServerError({ msg: error.message })
        }
    }
}