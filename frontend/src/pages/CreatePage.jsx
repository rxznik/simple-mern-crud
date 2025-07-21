import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        const postNote = async () => {
            try {
                const response = await api.post("/notes", {
                    title,
                    content
                });
                if (response.status >= 400) {
                    throw Error(response.data.error || response.data.message);
                }
                toast.success("Note created successfully");
                navigate("/");
            } catch (err) {
                console.error("Error creating note:", err);
                toast.error("Error creating note");
            }
            setIsLoading(false);
        };

        postNote();
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to="/" className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to Notes
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Create New Note
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
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
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
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="card-actions justify-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary font-bold"
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? "Creating..."
                                            : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
