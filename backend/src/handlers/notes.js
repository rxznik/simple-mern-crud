import express from "express";
import NoteService from "../services/notes.js";
import mongoose from "mongoose";

class NotesHandler {
    static setupRoutes() {
        const router = express.Router();
        router.get("/", NotesHandler.getNotesTotal);
        router.post("/", NotesHandler.createNote);
        router.get("/:id", NotesHandler.getNoteByID);
        router.patch("/:id", NotesHandler.updateNote);
        router.delete("/:id", NotesHandler.deleteNote);
        return router;
    }

    /**
     * Returns the total number of notes in the database.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async getNotesTotal(req, res, next) {
        const { search, limit, offset } = req.query;
        try {
            const { notesDTOs, total } = await NoteService.getNotes(
                search,
                limit,
                offset
            );
            res.status(200);
            res.json({ data: notesDTOs.map((note) => note.toObject()), total });
        } catch (error) {
            res.status(500);
            next(error);
        }
        next();
    }

    /**
     * Returns a note by its ID.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async getNoteByID(req, res, next) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            next(new Error("Invalid ID"));
            return;
        }

        try {
            const noteDTO = await NoteService.getNoteByID(id);
            if (noteDTO === null) {
                res.status(404);
                next(new Error("Note not found"));
                return;
            }
            res.status(200);
            res.json(noteDTO.toObject());
        } catch (error) {
            res.status(500);
            next(error);
        }
        next();
    }

    /**
     * Creates a new note in the database.
     * @param {express.Request} req - The request object. The request body should contain the new note's title and content.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async createNote(req, res, next) {
        const { title, content } = req.body;
        try {
            const noteDTO = await NoteService.createNote(title, content);
            res.status(201);
            res.json(noteDTO.toObject());
        } catch (error) {
            if (
                error.name === "ValidationError" ||
                error.name === "CastError"
            ) {
                res.status(400);
            } else {
                res.status(500);
            }
            next(error);
        }
        next();
    }

    /**
     * Updates an existing note in the database.
     * @param {express.Request} req - The request object. The request body should contain the updated title and content.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async updateNote(req, res, next) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            next(new Error("Invalid ID"));
            return;
        }
        const { title, content } = req.body;
        try {
            const noteDTO = await NoteService.updateNote(id, title, content);
            if (noteDTO === null) {
                res.status(404);
                next(new Error("Note not found"));
                return;
            }
            res.status(200);
            res.json(noteDTO.toObject());
        } catch (error) {
            if (
                error.name === "ValidationError" ||
                error.name === "CastError"
            ) {
                res.status(400);
            } else if (error.name === "NotFoundError") {
                res.status(404);
            } else {
                res.status(500);
            }
            next(error);
        }
        next();
    }

    /**
     * Deletes a note by its ID.
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     * @param {express.NextFunction} next - The next middleware function in the stack.
     */
    static async deleteNote(req, res, next) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400);
            next(new Error("Invalid ID"));
            return;
        }
        try {
            const deletedID = await NoteService.deleteNote(id);
            if (deletedID === null) {
                res.status(404);
                next(new Error("Note not found"));
                return;
            }
            res.status(204).end();
        } catch (error) {
            if (error.name === "DocumentNotFoundError") {
                res.status(404);
            }
            res.status(500);
            next(error);
        }
        next();
    }
}

export default NotesHandler;
