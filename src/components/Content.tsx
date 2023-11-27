import { useState } from "react";
import { useEffect } from "react";
import { getBooks } from "../firebase";

const Content = () => {
    const [data, setData] = useState([])

    async function getAllBooks(){
        const tempArr : any = []
        const books = await getBooks()
        books.forEach(doc =>{
            tempArr.push({...doc.data(), bookID: doc.id})
        })
        setData(tempArr)
    }
    useEffect(()=>{
        getAllBooks()
        console.log(data)
    },[])

    return ( 

        <div className="grid lg:grid-cols-2 gap-4 text-slate-500" >
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
                <div className="card w-full border h-48 p-4 flex gap-4 relative" key={index}>
                    <img src="https://m.media-amazon.com/images/I/81JwNzB0dVL._SY466_.jpg" alt="" className="h-full w-[125px] object-cover" />
                    <div className="grow">
                        <h3 className="font-semibold text-slate-800 text-xl">{book.title}</h3>
                        <p className="text-sm">{book.description}</p>
                        
                    </div>
                </div>
            ))}
            {data.map((book: any, index)=>(
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