import Navbar from "../components/Navbar";
import Content from "../components/Content";
import useGetBooks from "../hooks/useGetBooks";

const Home = () => {
    const {data} = useGetBooks()

    return ( 
        <>
          <Navbar />
          <div className="flex justify-center relative z-10 mt-[125px] h-screen">
            <div className="max-w-5xl grow mx-4 md:mx-0">
            {data && <Content booksData={data} />}
            {!data && <span>No books found</span>}
            </div>
          </div>
        </>
     );
}
 
export default Home;