import axios from "@/axiosInstance";
export const getFarmers = async () => {
  try {
    const { data } = await axios.get("/api/farmer/all");
    return data;
  } catch (error) {
    console.error("error in getFarmers method", error);
  }
};
export const getExperts = async () => {
  try {
    const { data } = await axios.get("/api/expert");
    return data;
  } catch (error) {
    console.error("error in getExperts method", error);
  }
};
export const getMessages = async () => {
  try {
    const { data } = await axios.get("/api/message/all");
    return data;
  } catch (error) {
    console.error("error in getMessages method", error);
  }
};
export const getNews = async () => {
  try {
    const { data } = await axios.get("/news/getAllNews");
    return data;
  } catch (error) {
    console.error("error in getNews method", error);
  }
};
