import express from "express";
import cors from "cors";
import middlewares from "../middlewares/index.js";
import NotesHandler from "../handlers/notes.js";

class Server {
    #server;
    #app;

    constructor(port, host) {
        this.port = port;
        this.host = host;

        this.#app = express();

        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use("/api/notes", NotesHandler.setupRoutes());
        this.#app.use(middlewares.ErrorRespondent.init());
        this.#app.use(middlewares.RequestLogger.init());
    }

    open() {
        return new Promise((resolve, reject) => {
            this.#server = this.#app.listen(this.port, this.host, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log(
                    `Server is running on http://${this.host}:${this.port}`
                );
                resolve();
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            if (!this.#server) {
                resolve();
                return;
            }

            this.#server.close((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}

export default Server;
