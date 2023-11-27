import { Books } from "../pages/Home";

type BooksProps = {
    booksData: Books[]
}

const Content = ({booksData}:  BooksProps) => {

    return ( 

        <div className="grid lg:grid-cols-2 gap-4 text-slate-500" >
            {booksData.map((book: any, index: number)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}

        </div>
    );
}
 
export default Content;