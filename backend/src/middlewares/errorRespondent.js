import express from "express";

class ErrorRespondent {
    _ErrNotFoundMessage = "Not found";
    _ErrInternalServerErrorMessage = "Internal server error";
    _ErrBadRequestMessage = "Bad request";

    static init() {
        return ErrorRespondent._errorRespondent;
    }

    /**
     * Error-handling middleware function. Checks the HTTP status code set on
     * the response object and sends an appropriate error message to the client.
     *
     * @param {Error} err - The error object.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async _errorRespondent(err, req, res, next) {
        if (res.headersSent) {
            return next(err);
        }

        switch (res.statusCode) {
            case 404:
                res.json({ error: "Not found" });
                break;
            case 500:
                console.error(err);
                res.json({ error: "Internal server error" });
                break;
            case 400:
                res.json({ error: err.message || "Bad request" });
                break;
            default:
                if (err) {
                    console.error(err);
                    res.status(500);
                    res.json({ error: "Internal server error" });
                }
                break;
        }
        next();
    }
}

export default ErrorRespondent;
