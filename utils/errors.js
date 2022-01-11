class ValidationError extends Error {
}

const handleError = (err, req, res, next) => {
    // if in the program would be possibility to enter to the element which is not existing, we would like to use
    // code:  404
    // if (err instanceof NotFoundError) {
    //     res
    //         .status(404)
    //         .render('error',{
    //             message: 'Cannot find element with this ID',
    //         });
    //     return;
    // }

    console.error(err);

    res.status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Apologize, try again in couple minutes',
        })
}

module.exports = {
    handleError, ValidationError
}
