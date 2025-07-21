import Navbar from "../components/Navbar";
import { Loader2Icon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NoteNotFound from "../components/NotesNotFound";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/notes");
                if (response.status >= 400) {
                    throw Error(response.data.error || response.data.message);
                }
                setNotes(response.data.data);
            } catch (err) {
                console.error("Error fetching notes:", err);
                toast.error("Error fetching notes");
            }
            setIsLoading(false);
        };

        fetchNotes();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {isLoading && (
                    <div className="flex items-center justify-center [min-height:50vh]">
                        <Loader2Icon className="size-10 animate-spin text-pink-200" />
                    </div>
                )}
                {!isLoading && notes.length === 0 && <NoteNotFound />}
                {!isLoading && notes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                setNotes={setNotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
