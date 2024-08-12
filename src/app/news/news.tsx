"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface News {
  id: number;
  title: string;
  content: string;
  image: string;
}

export default function Page() {
  const [news, setNews] = useState<News[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<News>>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:5000/news/getAllNews",
        );
        setNews(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await axios.delete(`http://127.0.0.1:5000/news/delete/${deleteId}`);
        setNews(news.filter((item) => item.id !== deleteId));
        setShowModal(false);
      } catch (error) {
        console.error("Failed to delete news", error);
        alert("Failed to delete news");
      }
    }
  };

  const handleExpand = (item: News) => {
    setExpandedId(item.id);
    setFormData(item);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id: number) => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:5000/news/updateNew/${id}`,
        formData,
      );
      setNews(news.map((item) => (item.id === id ? data : item)));
      setExpandedId(null);
    } catch (error) {
      console.error("Failed to update news", error);
      alert("Failed to update news");
    }
  };

  const handleCancel = () => {
    setExpandedId(null);
  };

  const handleShowModal = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="width-full flex flex-col items-center">
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div
            key={item.id}
            className="border-gray-200 dark:bg-gray-800 dark:border-gray-700 m-w-50 transform-gpu rounded-lg border shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Link href="#">
              <img className="rounded-t-lg" src={item.image} alt="" />
            </Link>
            <div className="p-5">
              <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                  {item.title}
                </h5>
              </Link>
              <div className="group relative">
                <p
                  className="mb-4 h-20 overflow-hidden p-1 font-normal text-black dark:text-white"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Limits the text to 3 lines
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                  }}
                >
                  {item.content}
                </p>
                {item.content.length > 100 && (
                  <div
                    className="m-w-80 absolute left-0 z-10 hidden rounded-lg bg-black p-2 text-sm text-white shadow-lg group-hover:block"
                    style={{
                      bottom: "-10%",
                      left: "-10%",
                      transform: "translateY(50px)",
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleExpand(item)}
                  className="inline-flex transform items-center rounded-lg bg-blue-800 px-3 py-2 text-center text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                <button
                  onClick={() => handleShowModal(item.id)}
                  className="focus:ring-red-300 dark:bg-red-700 dark:focus:ring-red-800 inline-flex transform items-center rounded-md bg-red px-3 py-2 text-center text-sm font-medium text-white transition duration-300 hover:scale-105 focus:outline-none focus:ring-4 dark:hover:bg-red"
                >
                  Delete
                </button>
              </div>
            </div>
            {expandedId === item.id && (
              <div className="space-y-4 p-5">
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="content"
                  value={formData.content || ""}
                  onChange={handleInputChange}
                  placeholder="Content"
                  className="text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 w-full rounded border px-3 py-2"
                />
                <input
                  type="text"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600 w-full rounded border px-3 py-2"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="transform rounded-lg bg-green-800 px-3 py-2 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-800 hover:bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800 transform rounded-lg px-3 py-2 text-sm font-medium text-white transition duration-300 hover:scale-105 focus:outline-none focus:ring-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-sm rounded bg-white p-8 shadow-lg ">
            <h2 className="mb-4 text-2xl font-bold ">Confirm Deletion</h2>
            <p className="dark:text-gray-400 mb-4 text-black">
              Are you sure you want to delete this news item?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="dark:bg-red-500 dark:hover:bg-red-600 transform rounded bg-red px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-red"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="dark:hover:bg-gray-600 transform rounded bg-gray px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-gray dark:bg-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
