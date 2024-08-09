import axios from "@/axiosInstance";
import UploadImage from "@/helpers/uploadImage";

const handleSubmit = async (formData: FormData, router) => {
  const ImageFile = formData.get("image");
  const ImageUrl = await UploadImage(ImageFile);
  const expert = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    profileImage: ImageUrl,
  };
  try {
    await axios.post("/api/expert/signup", expert);
    router.push("/");
  } catch (error) {
    console.error("Error creating expert:", error);
  }
};
export default handleSubmit;
