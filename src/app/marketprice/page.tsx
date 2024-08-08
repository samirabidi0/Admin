"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa'; 
import DefaultLayout from "@/components/Layouts/DefaultLayout"
interface PriceModel {
  id: number;
  price: number;
  name: string;
  image: string;
  updatedAt: string;
}

export default function Page() {
  const [price, setPrice] = useState<PriceModel[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<PriceModel>>({});
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://127.0.0.1:5000/api/price/all");
        setPrice(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    fetchData();
  }, []);

  const handleEdit = (item: PriceModel) => {
    setEditId(item.id);
    setFormData(item);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id: number) => {
    try {
      const { name, price, image } = formData;
      if (price === undefined) {
        throw new Error("Price is required");
      }
      const formattedPrice = typeof price === 'number' ? price : parseInt(price, 10);
      const { data } = await axios.put(`http://127.0.0.1:5000/api/price/update/${id}`, {
        name,
        price: formattedPrice,
        image,
      });
      setPrice((prevPrice) =>
        prevPrice.map((item) => (item.id === id ? data : item))
      );
      setEditId(null);
    } catch (error) {
      console.error("Failed to update model", error);
      alert("Failed to update model");
    }
  };
  const handleCancel = () => {
    setEditId(null);
  };
  const handleAddModel = async () => {
    try {
      const { name, price, image } = formData;
      const data = {
        name,
        price: Number(price),
        image
      };
      const response = await axios.post("http://127.0.0.1:5000/api/price/add", data);
      setPrice((prevPrice) => [...prevPrice, response.data]);
      setShowAddForm(false);
      setFormData({});
    } catch (error) {
      console.error("Failed to add model", error);
      alert("Failed to add model");
    }
  };
  return (
    <DefaultLayout>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex flex-col items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">Product prices</h4>
      </div>
      <button
        className="px-4 py-2 text-white bg-green-950 rounded"
        type="submit"
        onClick={() => setShowAddForm(true)}
      >
        Add product
      </button>
      {showAddForm && (
        <div className="p-8 mt-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex justify-center mb-4">
            <h1 className="text-4xl text-gray-800 font-bold">Add Price</h1>
          </div>
          <form>
            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-lg text-gray-900">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="w-full bg-white rounded border border-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-lg text-gray-900">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                  className="w-full bg-white rounded border border-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label className="leading-7 text-lg text-gray-900">Image</label>
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  className="w-full bg-white rounded border border-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleAddModel}
                  className="flex justify-center items-center text-white bg-green-700 border-0 py-3 px-6 focus:outline-none rounded text-xl font-bold shadow-lg w-full max-w-xs"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-3 bg-red-700 text-black text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Updated At</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {price.map((item) => (
              <tr
                className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-black"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img src={item.image} width={60} height={50} alt={item.name} />
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">
                  {editId === item.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleInputChange}
                        className="border p-1 rounded"
                      />
                      <FaCheck
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleUpdate(item.id)}
                      />
                    </div>
                  ) : (
                    <div>
                   {item.price}
                   <FaEdit
                    className="text-blue-500 cursor-pointer "
                    onClick={() => handleEdit(item)}
                  />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{moment(item.updatedAt).fromNow()}</td>
                <td className="px-6 py-4 text-right">
                  {editId === item.id ? (
                    <div className="flex space-x-2 items-center">
                      <FaTimes
                        className="text-red-500 cursor-pointer"
                        onClick={handleCancel}
                      />
                      <FaCheck
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleUpdate(item.id)}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </DefaultLayout>
  );
}