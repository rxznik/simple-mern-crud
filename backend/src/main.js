import Config from "./config/index.js";
import Server from "./server/index.js";
import Database from "./database/index.js";

const config = new Config();
const server = new Server(config.port, config.host);
const db = new Database(config.mongoDSN);

await db.open();
await server.open(config.port, config.host);

const shutdown = async () => {
    await db.close();
    console.log("Database connection closed");
    await server.close();
    console.log("Server stopped");
    process.exit(0);
};

const shutdownWithTimeout = () => {
    shutdown();
    setTimeout(() => {
        console.log("Timeout reached. Forcing shutdown...");
        process.exit(1);
    }, 10000);
};

process.on("SIGINT", shutdownWithTimeout);
process.on("SIGTERM", shutdownWithTimeout);

console.log("Press Ctrl+C to stop the application");
