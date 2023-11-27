import { ChangeEvent, useEffect, useState } from "react";
import { UploadFile, addToFireStore, invalidThumbnail, invalidBookFile } from "../firebase";
import { useNavigate } from "react-router-dom";

const UploadBooks = () => {
    const nav = useNavigate()
    const user = JSON.parse(localStorage.getItem('user')!)
    const [title, setTitle] = useState('')    
    const [description, setDescription] = useState('')    
    const [file, setFile] = useState<File | null>(null)   
    const [thumbNail, setThumbNail] = useState<File | null>(null)
    const [alert, setAlert] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFile(e.target.files![0])
    }
    
    function handleChangeTN(e: ChangeEvent<HTMLInputElement>){
        setThumbNail(e.target.files![0])
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if(file &&  thumbNail){
            if(!title) {
                setAlert('Title is required')
                setShowAlert(true)
                setTimeout(()=>  setShowAlert(false), 2000)
                return 
            }
            if(!description){
                setAlert('Description is required')
                setShowAlert(true)
                setTimeout(()=>  setShowAlert(false), 2000)
                return 
            }
            if(invalidThumbnail(thumbNail)){
                setAlert('Thumbnail must be of type image')
                setShowAlert(true)
                setTimeout(()=>  setShowAlert(false), 2000)
                return
            }
            if(invalidBookFile(file)){
                setAlert('E-book must be of type pdf')
                setShowAlert(true)
                setTimeout(()=>  setShowAlert(false), 2000)
                return 
            }

            try {
                const upload = await UploadFile('books', file, thumbNail)
                const tn = upload?.thumbnail
                const eb = upload?.book
                await addToFireStore('books', {
                    userID: user.userID,
                    title,
                    description,
                    thumbNail: tn,
                    bookFile: eb,
                    addedAt: Date.now()
                })
                setDescription('')
                setFile(null)
                setThumbNail(null)
                setTitle('')
                setAlert('Uploaded successfully')
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false)
                    nav('/my-books')
                },2000);
            } catch (error) {
                console.log(error)
                setAlert('Input file is required')
                setShowAlert(true)
                setTimeout(()=>  setShowAlert(false), 2000)
            }
       }



    }

    useEffect(()=>{
        console.log(alert)
    },[alert])

    return ( 
        <div className="min-h-screen w-full flex items-center justify-center bg-indigo-400 relative">
            {showAlert && <div className="absolute top-0 w-[380px] bg-indigo-700 text-white text-center font-semibold p-3">{alert}</div>}
            <div className="bg-white w-[380px] p-4 rounded relative" >
            <button className="absolute top-0 right-0 m-2" onClick={()=> nav('/my-books')}><i className="bi bi-x-lg"></i></button>
            <form onSubmit={handleSubmit} encType="multipart/form-data" id="FORM">
                    <div className="mb-4">
                        <label htmlFor="title" className="text-slate-500 font-semibold">Book title</label>
                        <input type="text" 
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            placeholder="your title"
                            id="title"
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="text-slate-500 font-semibold">Thumbnail (Portrait)</label>
                        <input type="file"
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            id="file1"
                            name="file1"
                            accept=".jpg, .png, .jpeg, .webp"
                            onChange={handleChangeTN}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="text-slate-500 font-semibold">E-book file</label>
                        <input type="file"
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            id="file2"
                            accept=".pdf"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="text-slate-500 font-semibold">Description</label>
                        <textarea
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            placeholder="your description"
                            id="description"
                            onChange={(e)=> setDescription(e.target.value)}
                            value={description}
                        >
                       </textarea>
                    </div>
                    
                        
                    <button
                        type="submit" 
                        className="w-full bg-indigo-600 py-3 rounded text-white font-semibold"
                    >Upload</button>
                </form>
            </div>
        </div>
     );
}
 
export default UploadBooks;