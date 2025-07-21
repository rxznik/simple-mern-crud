import { Link } from "react-router";
import { NotebookIcon } from "lucide-react";

const NoteNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 p-8 rounded-full">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">No notes yet</h3>
            <p className="text-base-content/70">
                Ready to orgainize thoughts? Create your first note to get
                started on your journey.
            </p>
            <Link to="/create" className="btn btn-primary">
                Create Your First Note
            </Link>
        </div>
    );
};

export default NoteNotFound;
