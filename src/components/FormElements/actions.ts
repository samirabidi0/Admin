'use server'
import axios from 'axios';
import UploadImage from '../../helpers/uploadImage'

const handleSubmit = async (formData:FormData) => {
    'use server'
    const ImageFile = formData.get('image')
    const ImageUrl = await UploadImage(ImageFile)
    console.log(ImageUrl)
   const product={
            name: formData.get('name') ,
            description: formData.get('description'),
            price: +formData.get('price'),
            category: formData.get('category'),
            quantity: +formData.get('quantity'),
            image: ImageUrl
   }
    try {
        const addPost = axios.post('http://127.0.0.1:5000/api/tools/add',product)
         console.log(addPost);

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  export default handleSubmit