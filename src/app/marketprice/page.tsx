"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
      const formattedPrice =
        typeof price === "number" ? price : parseInt(price, 10);
      const { data } = await axios.put(
        `http://127.0.0.1:5000/api/price/update/${id}`,
        {
          name,
          price: formattedPrice,
          image,
        },
      );
      setPrice((prevPrice) =>
        prevPrice.map((item) => (item.id === id ? data : item)),
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
        image,
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/api/price/add",
        data,
      );
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
        <div className="flex flex-col items-center px-4 py-6 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Product prices
          </h4>
        </div>
        <button
          className="rounded bg-green-950 px-4 py-2 text-white"
          type="submit"
          onClick={() => setShowAddForm(true)}
        >
          Add product price
        </button>
        {showAddForm && (
          <div className="mx-auto mt-8 max-w-lg rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 flex justify-center">
              <h1 className="text-gray-800 text-4xl font-bold">Add Price</h1>
            </div>
            <form>
              <div className="w-full p-2">
                <div className="relative">
                  <label className="text-gray-900 text-lg leading-7">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="border-gray-400 text-gray-900 w-full rounded border bg-white px-3 py-2 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="relative">
                  <label className="text-gray-900 text-lg leading-7">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    className="border-gray-400 text-gray-900 w-full rounded border bg-white px-3 py-2 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="relative">
                  <label className="text-gray-900 text-lg leading-7">
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image || ""}
                    onChange={handleInputChange}
                    className="border-gray-400 text-gray-900 w-full rounded border bg-white px-3 py-2 text-base leading-8 outline-none transition-colors duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleAddModel}
                    className="flex w-full max-w-xs items-center justify-center rounded border-0 bg-green-700 px-6 py-3 text-xl font-bold text-white shadow-lg focus:outline-none"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-red-700 hover:bg-gray-400 focus:ring-gray-300 rounded-md px-4 py-3 text-base font-medium text-black shadow-sm focus:outline-none focus:ring-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated At
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {price.map((item) => (
                <tr
                  className="dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border-b bg-white text-black"
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium dark:text-white"
                  >
                    <img
                      src={item.image}
                      width={60}
                      height={50}
                      alt={item.name}
                    />
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
                          className="rounded border p-1"
                        />
                        <FaCheck
                          className="cursor-pointer text-green-500"
                          onClick={() => handleUpdate(item.id)}
                        />
                      </div>
                    ) : (
                      <div>
                        {item.price}
                        <FaEdit
                          className="flex cursor-pointer text-blue-500"
                          onClick={() => handleEdit(item)}
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.updatedAt).fromNow()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {editId === item.id ? (
                      <div className="flex items-center space-x-2">
                        <FaTimes
                          className="text-red-500 cursor-pointer"
                          onClick={handleCancel}
                        />
                        <FaCheck
                          className="cursor-pointer text-green-500"
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
