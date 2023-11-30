import { ChangeEvent, useState } from "react";
import { UploadFile, addToFireStore, invalidThumbnail, invalidBookFile, getDownloadImageURL } from "../firebase";
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
    const [loading, setLoading] = useState(false)
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setFile(e.target.files![0])
    }
    
    function handleChangeTN(e: ChangeEvent<HTMLInputElement>){
        setThumbNail(e.target.files![0])
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        if(file &&  thumbNail){
            setLoading(true)
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

            await UploadFile(thumbNail, `thumbNails/${thumbNail.name}`).catch(err => console.log(err))
            const imageURL = await getDownloadImageURL(`thumbNails/${thumbNail.name}`).catch(err => console.log(err))
            await UploadFile(file, `books/${file.name}`).catch(err => console.log(err))
            const pdfURL = await getDownloadImageURL(`books/${file.name}`).catch(err => console.log(err))
            await addToFireStore('books', {
                userID: user.id,
                title,
                description,
                thumbNail: thumbNail.name,
                thumbNailURL: imageURL,
                bookFile: `File_${Date.now()}${file.name}`,
                bookFileURL: pdfURL,
                addedAt: Date.now()
            }).catch(err => console.log(err))

            setAlert('Uploaded successfully')
            setLoading(false)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
                nav('/my-books')
            }, 2000);

       }

    }

    return ( 
        <div className="min-h-screen w-full flex items-center justify-center bg-indigo-700 relative">
            {showAlert && <div className="absolute top-0 w-[380px] bg-indigo-500 text-white text-center font-semibold p-3">{alert}</div>}
            <div className="bg-white w-[380px] px-4 py-6 rounded relative " >
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
                        <label htmlFor="file" className="text-slate-500 font-semibold">Thumbnail: <span className="text-xs font-normal">(Portrait)</span></label>
                        <input type="file"
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            id="file1"
                            name="file1"
                            accept=".jpg, .png, .jpeg, .webp"
                            onChange={handleChangeTN}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="text-slate-500 font-semibold">E-book file: (<span className="text-xs font-normal">Click <a className="text-blue-500 underline" target="_blank" href="https://learn.g2.com/ebook-formats"> here</a> to see formats</span>)</label>
                        <input type="file"
                            className="w-full focus:outline-none bg-slate-200 py-3 px-3 text-sm text-slate-800 " 
                            id="file2"
                            accept=".pdf, .epub, .mobi, .txt, .azw, .docx, .doc"
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
                    >
                        {loading && <span>Uploading... <p className="animate-spin inline-block"><i className="bi bi-arrow-clockwise text-md"></i></p></span>}
                        {!loading && <span>Upload</span>}
                     </button>
                </form>
            </div>
        </div>
     );
}
 
export default UploadBooks;