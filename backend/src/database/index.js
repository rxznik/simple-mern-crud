import mongoose from "mongoose";

class Database {
    constructor(dsn) {
        this.dsn = dsn;
        this.db = null;
    }

    async open() {
        try {
            this.db = await mongoose.connect(this.dsn);
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exit(1);
        }
    }

    async close() {
        try {
            await this.db.disconnect();
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error);
            process.exit(1);
        }
    }
}

export default Database;
