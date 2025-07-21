import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: false
        }
    },
    { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);
