import { ref, getDownloadURL,uploadBytes } from "firebase/storage";
import {storage} from '../../firebaseConfig'
 const imageuploading =async ( file: Blob | ArrayBuffer | null)=>{
    if (file === null) {
        console.error("No file selected");
        return;
      }
      else{

        const storageRef = ref(storage, `images/${file.name}`); 
        await uploadBytes(storageRef, file); 

        const url = await getDownloadURL(storageRef); 
        return url

      }


 }
 export default imageuploading;