import { Routes, Route } from "react-router";
import { HomePage, CreatePage, NoteDetailPage } from "./pages";

const App = () => {
    return (
        <div className="relative h-full w-full">
            <div
                className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
            [background:radial-gradient(125%_125%_at_50%_10%,#000_70%,#FF9DFF40_100%)]"
            ></div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
            </Routes>
        </div>
    );
};

export default App;
