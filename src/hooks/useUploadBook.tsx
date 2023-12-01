import { ChangeEvent, useState } from "react";
import { UploadFile, addToFireStore, invalidThumbnail, invalidBookFile, getDownloadImageURL } from "../firebase";
import { useNavigate } from "react-router-dom";

export const useUploadBook = () =>{
    const nav = useNavigate()
    const user = JSON.parse(localStorage.getItem('user')!)
    const [title, setTitle] = useState('')    
    const [description, setDescription] = useState('')    
    const [file, setFile] = useState<File | null>(null)   
    const [thumbNail, setThumbNail] = useState<File | null>(null)
    const [alert, setAlert] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    
    return {title, setTitle, description, setDescription, alert, showAlert, loading, handleChange, handleChangeTN, handleSubmit, nav }
    
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
                setLoading(false)
                setTimeout(()=>  setShowAlert(false), 2000)
                return 
            }
            if(!description){
                setAlert('Description is required')
                setShowAlert(true)
                setLoading(false)

                setTimeout(()=>  setShowAlert(false), 2000)
                return 
            }
            if(invalidThumbnail(thumbNail)){
                setAlert('Thumbnail must be of type image')
                setShowAlert(true)
                setLoading(false)
                setTimeout(()=>  setShowAlert(false), 2000)
                return
            }
            if(invalidBookFile(file)){
                setAlert('E-book must be of type pdf')
                setShowAlert(true)
                setLoading(false)
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
}