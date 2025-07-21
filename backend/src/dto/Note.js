// eslint-disable-next-line no-unused-vars
import Note from "../models/Note.js";

export class NoteDTO {
    /**
     * @param {Note} note - The Note instance to create a DTO from.
     */
    constructor(note) {
        this.id = note._id;
        this.title = note.title;
        this.content = note.content;
        this.createdAt = note.createdAt;
        this.updatedAt = note.updatedAt;
    }

    /**
     * Creates a NoteDTO instance from a Note instance.
     * @param {Note} note - The Note instance to create a DTO from.
     * @returns {NoteDTO} The created DTO instance.
     */
    static create(note) {
        return new NoteDTO(note);
    }

    /**
     * Creates an array of NoteDTO instances from an array of Note instances.
     * @param {Note[]} notes - The array of Note instances to create DTOs from.
     * @returns {NoteDTO[]} An array of created DTO instances.
     */

    static createMany(notes) {
        return notes.map((note) => new NoteDTO(note));
    }

    toObject() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }
}

export default NoteDTO;
