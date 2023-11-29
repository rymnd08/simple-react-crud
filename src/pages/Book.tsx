import { useParams } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import Navbar from "../components/Navbar";

const Book = () => {
    const { id } = useParams();
    const { data } = useGetBooks();

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    const book = data.find((book) => book.bookID === id);

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="mt-32 flex justify-center">
            <Navbar />
            <div className="max-w-5xl grow relative mb-20 bg-indigo-50 overflow-hidden py-6 lg:py-0" key={book.bookID}>
                <a
                    href={book.bookFileURL}
                    download={`BOOK_${book.bookFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 px-3 bg-indigo-700 text-white rounded-full text-md absolute bottom-0 lg:right-0 m-4 bg-opacity-90"
                >
                    Download <i className="bi bi-download"></i>
                </a>
                <div className="flex flex-col lg:flex-row lg:items-center p-4 gap-10">
                    <div className="bg-slate-700 aspect-[3/4] min-w-[300px] max-w-[300px] flex items-center self-center shadow-lg">
                        <img src={book.thumbNailURL} alt="" className="object-contain h-full w-full" />
                    </div>
                    <div className="grow mb-10 lg:mb-0">
                        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                        <h6 className="font-semibold text-slate-500">Book description:</h6>
                        <p className="text-slate-500">{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
