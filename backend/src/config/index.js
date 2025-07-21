import dotenv from "dotenv";

class Config {
    #port;
    #host;
    #mongoDSN;
    #mongoRegex = new RegExp(
        `^mongodb:\\/\\/([^:@]+(:[^@]+)?@)?.*:\\d{1,5}(\\/[a-zA-Z0-9-_?%&=]+)?\\/?$`
    );

    constructor(path = ".env") {
        dotenv.config({ path });
        this.#port = this._secureGetPort();
        this.#host = this._secureGetHost();
        this.#mongoDSN = this._secureGetMongoDSN();
    }

    /**
     * Gets the value of the environment variable and checks if it's set.
     * If the environment variable is not set, throws a ConfigError.
     * @param {string} envName - The name of the environment variable.
     * @returns {string} The value of the environment variable.
     * @throws {ConfigError} If the environment variable is not set.
     * @private
     */
    _getAndCheckEnv(envName) {
        const value = process.env[envName];
        if (!value) {
            throw new ConfigError(`Missing ${envName} environment variable`);
        }
        return value;
    }

    /**
     * Gets the port number from the environment variable and checks if it's valid.
     * If the port is invalid, throws a ConfigError.
     * @param {string} [envName="HTTP_PORT"] - The name of the environment variable.
     * @returns {number} The port number.
     * @throws {ConfigError} If the port is invalid.
     * @private
     */
    _secureGetPort(envName = "HTTP_PORT") {
        const port = parseInt(this._getAndCheckEnv(envName), 10);
        if (isNaN(port) || port < 1 || port > 65535) {
            throw new ConfigError("Invalid port number");
        }
        return port;
    }

    /**
     * Retrieves the host from the environment variable and validates its format.
     * If the host is invalid or does not match the expected format, throws a ConfigError.
     * @param {string} [envName="HTTP_HOST"] - The name of the environment variable.
     * @returns {string} The validated host.
     * @throws {ConfigError} If the host is invalid or does not match the expected format.
     * @private
     */
    _secureGetHost(envName = "HTTP_HOST") {
        const host = String(this._getAndCheckEnv(envName));
        if (!host) {
            throw new ConfigError("Invalid host");
        }
        return host;
    }

    /**
     * Retrieves the MongoDB connection string from the environment variable and validates its format.
     * If the mongoDSN is invalid or does not match the expected format, throws a ConfigError.
     * @param {string} [envName="MONGO_DSN"] - The name of the environment variable.
     * @returns {string} The validated mongoDSN.
     * @throws {ConfigError} If the mongoDSN is invalid or does not match the expected format.
     * @private
     */
    _secureGetMongoDSN(envName = "MONGO_DSN") {
        const mongoDSN = String(this._getAndCheckEnv(envName));
        if (!mongoDSN) {
            throw new ConfigError("Invalid mongoDSN");
        }

        if (!this.#mongoRegex.test(mongoDSN)) {
            throw new ConfigError("Invalid mongoDSN format");
        }
        return mongoDSN;
    }

    /**
     * Retrieves the port number set in the environment variable.
     * @returns {number} The port number.
     * @readonly
     * @throws {ConfigError} If the port is invalid.
     */
    get port() {
        return this.#port;
    }

    /**
     * The host name set in the environment variable.
     * @type {string}
     * @readonly
     * @throws {ConfigError} If the host is invalid.
     */
    get host() {
        return this.#host;
    }

    /**
     * The MongoDB connection string set in the environment variable.
     * @type {string}
     * @readonly
     * @throws {ConfigError} If the mongoDSN is invalid.
     */
    get mongoDSN() {
        return this.#mongoDSN;
    }
}

class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigError";
    }
}

export default Config;

export { ConfigError };
