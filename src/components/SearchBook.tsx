import { SearchProps } from "../pages/Home";

const SearchBook = ({handleSubmit, search, setSearch }: SearchProps) => {



    return ( 
        <div className="border mb-4  border-indigo-300 ">
           <form onSubmit={handleSubmit} className="flex items-center">
            <input type="text" value={search} placeholder="Search books" onChange={(e) => setSearch(e.target.value)}  className="outline-none w-full mx-3 my-2"  />
            <button type="submit" className="py-1 px-3 bg-indigo-100 mx-1"><i className="bi bi-search text-md font-bold"></i></button>
           </form>
        </div>
     );
}
 
export default SearchBook;