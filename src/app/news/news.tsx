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
        <div className="width-full flex flex-col items-center">
            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mb-8 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
                Add News
            </button>

            {showAddForm && (
                <div className="p-6 w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform-gpu duration-300 hover:scale-105">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Add News</h3>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ""}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="w-full px-3 py-2 mb-4 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <input
                        type="text"
                        name="content"
                        value={formData.content || ""}
                        onChange={handleInputChange}
                        placeholder="Content"
                        className="w-full px-3 py-2 mb-4 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <input
                        type="text"
                        name="image"
                        value={formData.image || ""}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 mb-4 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button
                        onClick={handleAddNews}
                        className="px-3 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 transform hover:scale-105 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                    >
                        Save
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-transform transform-gpu duration-300 hover:scale-105"
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
                        <div className="p-5">
                            <Link href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                                    {item.title}
                                </h5>
                            </Link>
                            <p className="mb-4 font-normal text-black dark:text-white">
                                {item.content}
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleExpand(item)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition duration-300 transform hover:scale-105"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleShowModal(item.id)}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red dark:focus:ring-red-800 rounded-md transition duration-300 transform hover:scale-105"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {expandedId === item.id && (
                            <div className="p-5 space-y-4">
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title || ""}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="w-full px-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <input
                                    type="text"
                                    name="content"
                                    value={formData.content || ""}
                                    onChange={handleInputChange}
                                    placeholder="Content"
                                    className="w-full px-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image || ""}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="w-full px-3 py-2 border rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleUpdate(item.id)}
                                        className="px-3 py-2 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition duration-300 transform hover:scale-105 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 transition duration-300 transform hover:scale-105 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-800"
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
                    <div className="bg-white p-8 rounded shadow-lg max-w-sm mx-auto ">
                        <h2 className="text-2xl font-bold mb-4 ">Confirm Deletion</h2>
                        <p className="mb-4 text-black dark:text-gray-400">Are you sure you want to delete this news item?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red text-white rounded hover:bg-red transition duration-300 transform hover:scale-105 dark:bg-red-500 dark:hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray text-white rounded hover:bg-gray transition duration-300 transform hover:scale-105 dark:bg-black dark:hover:bg-gray-600"
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