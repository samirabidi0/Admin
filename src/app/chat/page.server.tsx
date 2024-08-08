import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ChatPage from "./page";

const TablesPageServer = () => {
  const token = Cookies.get("authToken");
  let user = "";
  console.log("user", user);

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      user = decodedToken;
    } catch (error) {
      console.error("Invalid token");
    }
  }
  return <ChatPage />;
};

export default TablesPageServer;
