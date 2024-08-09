import axios from "@/axiosInstance";
import UploadImage from "../../helpers/uploadImage";

const handleSubmit = async (formData: FormData, router) => {
  const ImageFile = formData.get("image");
  const ImageUrl = await UploadImage(ImageFile);
  console.log(ImageUrl);
  const product = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: +formData.get("price"),
    category: formData.get("category"),
    quantity: +formData.get("quantity"),
    image: ImageUrl,
  };
  try {
    const addPost = await axios.post("/api/tools/add", product);
    router.push("/marketplace");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
export default handleSubmit;
