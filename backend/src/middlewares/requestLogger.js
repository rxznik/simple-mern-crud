import express from "express";
import Color from "../utils/color.js";

class RequestLogger {
    static init() {
        return RequestLogger._requestLogger;
    }

    /**
     * Middleware function that logs the HTTP method and URL of incoming requests.
     * Also logs the HTTP status code and status message of the response.
     *
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async _requestLogger(req, res, next) {
        console.log(
            RequestLogger._makeRequestDataBeautiful(
                Date.now(),
                req.method,
                req.url,
                res.statusCode,
                res.statusMessage
            )
        );
        next();
    }

    /**
     * Formats request data into a human-readable string.
     *
     * @param {number} ts - The timestamp of the request.
     * @param {string} method - The HTTP method used for the request.
     * @param {string} url - The URL of the request.
     * @param {number} statusCode - The HTTP status code of the response.
     * @param {string} statusMessage - The status message corresponding to the status code.
     * @returns {string} A formatted string representing the request data.
     */
    static _makeRequestDataBeautiful(
        ts,
        method,
        url,
        statusCode,
        statusMessage
    ) {
        ts = Color.magenta(ts);
        if (statusCode >= 500) {
            statusCode = Color.red(statusCode);
        } else if (statusCode >= 300) {
            statusCode = Color.yellow(statusCode);
        } else {
            statusCode = Color.green(statusCode);
        }

        switch (method) {
            case "GET":
                method = Color.greenBackground(method);
                break;
            case "POST":
                method = Color.yellowBackground(method);
                break;
            case "PUT":
                method = Color.magentaBackground(method);
                break;
            case "DELETE":
                method = Color.redBackground(method);
                break;
            default:
                method = Color.cyanBackground(method);
                break;
        }

        return `${ts} ${method} ${url} ${statusCode} ${statusMessage}`;
    }
}

export default RequestLogger;
