"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
                const { data } = await axios.get("http://127.0.0.1:5000/news/getAllNews");
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
            const { data } = await axios.put(`http://127.0.0.1:5000/news/updateNew/${id}`, formData);
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

    const handleAddNews = async () => {
        try {
            const { data } = await axios.post("http://127.0.0.1:5000/news/addNew", formData);
            setNews([...news, data]);
            setShowAddForm(false);
            setFormData({});
        } catch (error) {
            console.error("Failed to add news", error);
            alert("Failed to add news");
        }
    };

    return (
        <div className="ml-72 mt-20 flex flex-wrap space-x-4">
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="self-start inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 transform hover:scale-105"
            >
                Add News
            </button>

            {showAddForm && (
                <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform-gpu duration-300 hover:scale-105">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add News</h3>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="w-full px-3 py-2 mb-4 border rounded text-black"
                    />
                    <input
                        type="text"
                        name="content"
                        value={formData.content || ""}
                        onChange={handleInputChange}
                        placeholder="Content"
                        className="w-full px-3 py-2 mb-4 border rounded text-black"
                    />
                    <input
                        type="text"
                        name="image"
                        value={formData.image || ""}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 mb-4 border rounded text-black"
                    />
                    <button
                        onClick={handleAddNews}
                        className="px-3 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 transform hover:scale-105"
                    >
                        Save
                    </button>
                </div>
            )}

            {news.map((item) => (
                <div
                    key={item.id}
                    className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mb-4 transition-transform transform-gpu duration-300 hover:scale-105"
                >
                    <Link href="#">
                        <Image
                            className="rounded-t-lg"
                            src=""
                            alt=""
                            width={400}
                            height={200}
                            objectFit="cover"
                        />
                    </Link>
                    <div className="p-5 space-x-4">
                        <Link href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {item.title}
                            </h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {item.content}
                        </p>
                        <button
                            onClick={() => handleExpand(item)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-red-800 transition duration-300 transform hover:scale-105"
                        >
                            Update
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleShowModal(item.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-800 rounded-md transition duration-300 transform hover:scale-105"
                        >
                            Delete
                            <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                    {expandedId === item.id && (
                        <div className="p-5 space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleInputChange}
                                placeholder="Title"
                                className="w-full px-3 py-2 border rounded text-black"
                            />
                            <input
                                type="text"
                                name="content"
                                value={formData.content || ""}
                                onChange={handleInputChange}
                                placeholder="Content"
                                className="w-full px-3 py-2 border rounded text-black"
                            />
                            <input
                                type="text"
                                name="image"
                                value={formData.image || ""}
                                onChange={handleInputChange}
                                placeholder="Image URL"
                                className="w-full px-3 py-2 border rounded text-black"
                            />
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleUpdate(item.id)}
                                    className="px-3 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 transform hover:scale-105"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 transform hover:scale-105"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this news item?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 transform hover:scale-105"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-300 transform hover:scale-105"
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
