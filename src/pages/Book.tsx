import { useNavigate, useParams } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import Navbar from "../components/Navbar";
import { User } from "./Login";
import { deleteToFireStore, deleteFileInStorage } from "../firebase";
import { useState } from "react";

const Book = () => {
    const user : User = JSON.parse(localStorage.getItem('user')!)
    const { id } = useParams();
    const { data, isLoading } = useGetBooks();
    const nav = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)
    if (!data || data.length === 0 || isLoading) {
        return <div>Loading...</div>;
    }

    const book = data.find((book) => book.bookID === id);

    if (!book) {
        return <div>Book not found</div>;
    }

    async function deleteBook(bookID: string, bookFile: string, imageFile: string){
        const conf = confirm('Confirm Delete?')
        if(conf){
            try {
                setIsDeleting(true)
                await deleteFileInStorage(`books/${bookFile}`)
                await deleteFileInStorage(`thumbNails/${imageFile}`)
                await deleteToFireStore('books', bookID)
                setIsDeleting(false)
                nav('/my-books')
            } catch (error) {
                console.log('Error: ' +  error)
            }
        }
    }

    function downloadBook(fileURL: string, fileName: string){
        const cleanLink = fileURL.split('?')
        fetch(cleanLink[0])
        .then(response => response.blob())
        .then(blob => {
          // Create a link element
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = fileName;

          // Trigger the click event to start the download
          document.body.appendChild(a);
          a.click();

          // Clean up by removing the temporary link
          document.body.removeChild(a);
          URL.revokeObjectURL(a.href);
        })
        .catch(error => console.error('Error downloading the file:', error));
    }

    return (
        <div className="mt-32 flex justify-center">
            <Navbar />
            <div className="max-w-5xl grow relative mb-20 bg-indigo-50 overflow-hidden py-6 lg:py-0" key={book.bookID}>
                <div className="absolute bottom-0 lg:right-0 m-4 flex gap-4">
                    {user.id === book.userID && 
                    <button 
                        className="bg-rose-500 text-white py-1 px-3 rounded" 
                        onClick={()=> deleteBook(book.bookID, book.bookFile, book.thumbNail)}>
                        {isDeleting ? 'Deleting..' : 'Delete'} <i className="bi bi-trash2 text-md"></i>
                    </button>}
                    <button
                        onClick={()=>downloadBook(book.bookFileURL, book.bookFile)}
                        className="py-1 px-3 bg-indigo-700 text-white rounded-full text-md  bg-opacity-90"
                    >
                        Download <i className="bi bi-download"></i>
                    </button>
                </div>
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
