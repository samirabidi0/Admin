import axios from "@/axiosInstance";
import UploadImage from "@/helpers/uploadImage";

const handleSubmit = async (formData: FormData, router) => {
  const ImageFile = formData.get("image");
  const ImageUrl = await UploadImage(ImageFile);
  const expert = {
    title: formData.get("title"),
    content: formData.get("content"),
    image: ImageUrl,
  };
  try {
    await axios.post("/news/addNew", expert);
    router.push("/news");
  } catch (error) {
    console.error("Error creating expert:", error);
  }
};
export default handleSubmit;
