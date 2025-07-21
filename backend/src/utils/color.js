class Color {
    /**
     * Returns a string that renders as red text in the console.
     * @param {string} text - The text to be rendered in red.
     * @returns {string} The input text surrounded by ANSI escape codes to render it red in the console.
     */
    static red(text) {
        return `\x1b[31m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a red background in the console.
     * @param {string} text - The text to be rendered with a red background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a red background in the console.
     */

    static redBackground(text) {
        return `\x1b[41m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders as green text in the console.
     * @param {string} text - The text to be rendered in green.
     * @returns {string} The input text surrounded by ANSI escape codes to render it green in the console.
     */
    static green(text) {
        return `\x1b[32m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a green background in the console.
     * @param {string} text - The text to be rendered with a green background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a green background in the console.
     */
    static greenBackground(text) {
        return `\x1b[42m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders as yellow text in the console.
     * @param {string} text - The text to be rendered in yellow.
     * @returns {string} The input text surrounded by ANSI escape codes to render it yellow in the console.
     */
    static yellow(text) {
        return `\x1b[33m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a yellow background in the console.
     * @param {string} text - The text to be rendered with a yellow background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a yellow background in the console.
     */
    static yellowBackground(text) {
        return `\x1b[43m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders as blue text in the console.
     * @param {string} text - The text to be rendered in blue.
     * @returns {string} The input text surrounded by ANSI escape codes to render it blue in the console.
     */
    static blue(text) {
        return `\x1b[34m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a blue background in the console.
     * @param {string} text - The text to be rendered with a blue background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a blue background in the console.
     */

    static blueBackground(text) {
        return `\x1b[44m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders as magenta text in the console.
     * @param {string} text - The text to be rendered in magenta.
     * @returns {string} The input text surrounded by ANSI escape codes to render it magenta in the console.
     */
    static magenta(text) {
        return `\x1b[35m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a magenta background in the console.
     * @param {string} text - The text to be rendered with a magenta background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a magenta background in the console.
     */
    static magentaBackground(text) {
        return `\x1b[45m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders as cyan text in the console.
     * @param {string} text - The text to be rendered in cyan.
     * @returns {string} The input text surrounded by ANSI escape codes to render it cyan in the console.
     */
    static cyan(text) {
        return `\x1b[36m${text}\x1b[0m`;
    }

    /**
     * Returns a string that renders the text with a cyan background in the console.
     * @param {string} text - The text to be rendered with a cyan background.
     * @returns {string} The input text surrounded by ANSI escape codes to render it with a cyan background in the console.
     */
    static cyanBackground(text) {
        return `\x1b[46m${text}\x1b[0m`;
    }
}

export default Color;
