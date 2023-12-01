import Navbar from "../components/Navbar";

const PageNotFound = () => {
    return ( 
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-[80vh]">
                <h3 className="text-5xl text-indigo-700 font-bold">
                    Page not found
                </h3>
            </div>
        </>
     );
}
 
export default PageNotFound;