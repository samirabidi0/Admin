"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { formatDistanceToNow } from "date-fns";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getFarmers, getMessages } from "../hooks";

const socket = io("http://localhost:5000");

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setuser] = useState<any>({});
  const [farmers, setFarmers] = useState([]);
  const [receiver, setReceiver] = useState<any>({});

  const token = Cookies.get("authToken");
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const farmerList = await getFarmers();
        setFarmers(farmerList);
      } catch (error) {
        console.error("Failed to fetch farmers", error);
      }
    };
    const fetchMessages = async () => {
      try {
        const MessageList = await getMessages();
        setMessages(MessageList);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchFarmers();
    fetchMessages();
  }, []);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setuser(decodedToken);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, [token]);

  useEffect(() => {
    if (user.id && receiver.id) {
      socket.emit("join room", {
        farmerId: receiver.id,
        expertId: user.id,
        roomId: `${user.email}-${receiver.email}`,
      });

      socket.on("connect", () => {
        console.log("connected to server");
      });
      socket.on("chat message", (msgobj) => {
        setMessages((prevMessages) => [...prevMessages, msgobj]);
      });
      socket.on("disconnect", () => {
        console.log("disconnected from server");
      });
    }
    return () => {
      socket.off("chat message");
    };
  }, [user, receiver, user.email, receiver.email]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const messageObject = {
        senderName: user.firstName,
        senderId: user.id,
        roomId: `${user.email}-${receiver.email}`,
        message,
        createdAt: new Date().toISOString(),
      };
      socket.emit("chat message", messageObject);
      setMessage("");
    }
  };
  const handleSelectFarmer = (receiver: any) => {
    setReceiver(receiver);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chat" />
      <div className="mx-auto max-w-6xl rounded-lg bg-white px-4 py-8 shadow-lg sm:px-6 lg:px-8">
        <div className="flex" style={{ minHeight: "calc(-250px + 100vh)" }}>
          {/* List of Farmers */}
          <div className="w-1/4 pr-4">
            <div className="bg-gray-100 h-full rounded-lg p-4 shadow-inner">
              <h2 className="mb-4 text-lg font-semibold">Farmers</h2>
              <ul>
                {farmers.map((farmer) => (
                  <li
                    key={farmer.email}
                    className={`mb-4 flex cursor-pointer items-center rounded-lg p-2 ${
                      receiver.email === farmer.email
                        ? "bg-slate-200"
                        : "bg-white"
                    }`}
                    onClick={() => handleSelectFarmer(farmer)}
                  >
                    <img
                      src={farmer.profileImage}
                      alt={`${farmer.firstName} ${farmer.lastName}`}
                      className="mr-2 h-12 w-12 rounded-full"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                        {farmer.firstName} {farmer.lastName}
                      </div>
                      <div className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                        {farmer.email}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex w-3/4 flex-col">
            <div className="bg-gray-100 mb-4 h-64 overflow-y-scroll rounded-lg p-4 shadow-inner">
              <ul>
                {messages
                  .filter(
                    (msg) => msg.roomId === `${user.email}-${receiver.email}`,
                  )
                  .map((msg, index) => (
                    <li
                      key={index}
                      className="mb-2 rounded-lg bg-green-100 p-2"
                    >
                      <span className="text-black">{msg.message}</span> <br />
                      <small>
                        by {msg.senderName} at{" "}
                        {formatDistanceToNow(new Date(msg.createdAt), {
                          addSuffix: true,
                        })}
                      </small>
                    </li>
                  ))}
              </ul>
            </div>
            <form className="flex" onSubmit={sendMessage}>
              <input
                className="border-gray-300 flex-grow rounded-l-md border px-3 py-2 focus:border-green-500 focus:outline-none focus:ring"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={!receiver.id}
              />
              <button
                type="submit"
                className="rounded-r-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
                disabled={!receiver.id}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ChatPage;
