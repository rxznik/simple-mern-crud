import express from "express";
import Note from "../models/Note.js";
import NoteDTO from "../dto/Note.js";

class NotesService {
    /**
     * Retrieves a list of notes from the database, optionally filtered by a search term.
     * The notes are sorted by creation date in descending order.
     *
     * @param {string} search - The search term to filter notes by title. If empty, all notes are retrieved.
     * @param {number} [limit=10] - The maximum number of notes to return.
     * @param {number} [offset=0] - The number of notes to skip before starting to collect the result set.
     *
     * @returns {Promise<{notes: Array<NoteDTO>, total: number}>} An object containing the list of notes and the total number of notes.
     */

    static async getNotes(search, limit = 10, offset = 0) {
        let query;

        if (!search || search === "") {
            query = Note.find();
        } else {
            query = Note.find({
                title: { $regex: search, $options: "i" }
            });
        }
        const total = await query.clone().countDocuments();

        const notes = await query
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)
            .exec();

        const notesDTOs = NoteDTO.createMany(notes);

        return { notesDTOs, total };
    }

    /**
     * Retrieves a single note from the database by its ID.
     * @param {string} id - The MongoDB ObjectId of the note to retrieve.
     * @returns {Promise<NoteDTO | null>} The retrieved note or null if no such note exists.
     */
    static async getNoteByID(id) {
        const note = await Note.findById(id);
        if (!note) {
            return null;
        }
        const noteDTO = NoteDTO.create(note);
        return noteDTO;
    }

    /**
     * Creates a new note in the database.
     * @param {string} title - The title of the new note.
     * @param {string} [content=""] - The content of the new note.
     * @returns {Promise<NoteDTO | null>} The newly created note.
     */
    static async createNote(title, content = "") {
        const note = await Note.create({ title, content });
        const noteDTO = NoteDTO.create(note);
        return noteDTO;
    }

    /**
     * Updates a note in the database.
     * @param {string} id - The MongoDB ObjectId of the note to update.
     * @param {string | undefined | null} [title] - The new title of the note.
     * @param {string | undefined | null} [content] - The new content of the note.
     * @returns {Promise<NoteDTO | null>} The updated note or null if no fields were given to update.
     */
    static async updateNote(id, title, content) {
        const updateData = {};
        if (title) {
            updateData.title = title;
        }
        if (content) {
            updateData.content = content;
        }

        const oldNote = await Note.findById(id);
        if (!oldNote) {
            return null;
        }

        if (Object.keys(updateData).length === 0) {
            const noteDTO = NoteDTO.create(oldNote);
            return noteDTO;
        }
        const note = await Note.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );
        const noteDTO = NoteDTO.create(note);
        return noteDTO;
    }

    /**
     * Deletes a note from the database.
     * @param {string} id - The MongoDB ObjectId of the note to delete.
     * @returns {Promise<string | null>} The deleted note's ObjectId if successful, or null if an error occurred.
     */
    static async deleteNote(id) {
        const note = await Note.findById(id);
        if (!note) {
            return null;
        }
        await Note.findByIdAndDelete(note._id);
        return id;
    }
}

export default NotesService;
