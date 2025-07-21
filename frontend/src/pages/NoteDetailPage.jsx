import toast from "react-hot-toast";
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/axios";

const NoteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/notes/${id}`);
                if (response.status >= 400) {
                    throw Error(response.data.error || response.data.message);
                }
                setNote(response.data);
            } catch (err) {
                console.error("Error fetching note:", err);
                toast.error("Error fetching note");
            }
            setIsLoading(false);
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!note) {
            toast.error("Note not found");
            return;
        }

        if (!note.title.trim()) {
            toast.error("Title is required");
            return;
        }

        setIsSaving(true);
        try {
            const response = await api.patch(`/notes/${id}`, {
                title: note.title,
                content: note.content
            });
            if (response.status >= 400) {
                throw Error(response.data.error || response.data.message);
            }
            toast.success("Note updated successfully");
            navigate("/");
        } catch (err) {
            console.error("Error updating note:", err);
            toast.error("Error updating note");
        }
        setIsSaving(false);
    };

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
            navigate("/");
        } catch (err) {
            console.error("Error deleting note:", err);
            toast.error("Error deleting note");
        }
    };

    return (
        <div className="min-h-screen">
            {isLoading && (
                <div className="flex items-center justify-center [min-height:50vh]">
                    <Loader2Icon className="size-10 animate-spin text-pink-200" />
                </div>
            )}
            {!isLoading && note && (
                <div className="container mx-auto p-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <Link to="/" className="btn btn-ghost mb-6">
                                <ArrowLeftIcon className="size-5" />
                                Back to Notes
                            </Link>
                            <button
                                onClick={(e) => handleDelete(e, note.id)}
                                className="btn btn-error btn-outline mb-6"
                            >
                                <Trash2Icon className="size-5" />
                                Delete Note
                            </button>
                        </div>
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">
                                    Update Your Note
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Title
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Note Title"
                                            className="input input-bordered"
                                            value={note.title}
                                            onChange={(e) =>
                                                setNote((prev) => ({
                                                    ...prev,
                                                    title: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Content
                                            </span>
                                        </label>
                                        <textarea
                                            placeholder="Note Content"
                                            className="textarea textarea-bordered"
                                            rows="4"
                                            value={note.content}
                                            onChange={(e) =>
                                                setNote((prev) => ({
                                                    ...prev,
                                                    content: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary font-bold"
                                            disabled={isLoading}
                                        >
                                            {isSaving
                                                ? "Saving..."
                                                : "Save Note"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteDetailPage;
