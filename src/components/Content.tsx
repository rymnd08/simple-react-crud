import { useNavigate } from "react-router-dom";
import { Books } from "../hooks/useGetBooks";

type BooksProps = {
    booksData: Books[]
}

const Content = ({booksData}:  BooksProps) => {
    const navigate = useNavigate()
    function handleClick(id: string){
        navigate(`/book/${id}`)
    }

    return ( 

        <div className="grid lg:grid-cols-2 gap-4 text-slate-500" >
            {booksData.map((book: any, index: number)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative text-justify overflow-hidden" key={index} onClick={()=> handleClick(book.bookID)}>
                    <img src={book.thumbNailURL} alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm   ">{book.description}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}
 
export default Content;