import Navbar from "../components/Navbar";
import { addToFireStore, deleteToFireStore } from "../firebase";
addToFireStore

const Home = () => {

    function handleClick(){
        addToFireStore('users', {name: 'rymnd', age: 22, hobbies: ['gaming', 'coding', 'traveling', 'watching']})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    function deleteData(){
        deleteToFireStore('users', 'rHEPYs9NBPwdpHOFBp0e')
        .then(() => console.log('delete success'))
        .catch(err => console.log(err))
    }

    return ( 
        <>
            <Navbar />
        </>
     );
}
 
export default Home;