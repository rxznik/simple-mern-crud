import toast from "react-hot-toast";
import { Link } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
    const createdAt = new Date(note.createdAt).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            const response = await api.delete(`/notes/${id}`);
            if (response.status >= 400) {
                throw Error(response.data.error || response.data.message);
            }
            toast.success("Note deleted successfully");
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (err) {
            console.error("Error deleting note:", err);
            toast.error("Error deleting note");
        }
    };

    return (
        <Link
            to={`/note/${note.id}`}
            className="card bg-base-100 hover:shadow-secondary shadow-md transition-all duration-200
             border-2 border-white/10 border-t-4 border-t-secondary border-solid"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-2">
                    {note.content}
                </p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {createdAt}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, note.id)}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteCard;
