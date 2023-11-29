import { useParams } from "react-router-dom";
import useGetBooks from "../hooks/useGetBooks";
import { useEffect } from "react";

const Book = () => {
    const { id } = useParams()
    const {data} = useGetBooks()
    const books = data.filter(book =>{
        return book.bookID === id
    })

    useEffect(() => {
        // console.log(books[0])
    }, [books])

    return ( 
        <>
        </>
     );
}
 
export default Book;