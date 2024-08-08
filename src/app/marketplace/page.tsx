"use client"

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaRegPenToSquare, FaCheck } from "react-icons/fa6";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: string;
}

const MarketPlace = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [updatedName, setUpdatedName] = useState<string>('');
  const addProductRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product[]>('http://127.0.0.1:5000/api/tools/all');
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://127.0.0.1:5000/api/tools/${id}`)
      .then((response) => {
        console.log('Product deleted successfully', response.data);
        setProduct(products.filter(product => product.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = (id: number) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (productIdToDelete !== null) {
      handleDelete(productIdToDelete);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const handleEditClick = (id: number, name: string) => {
    setEditingProductId(id);
    setUpdatedName(name);
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/tools/${id}`, { name: updatedName });
      console.log('Product updated successfully');
      setProduct(products.map(product => product.id === id ? { ...product, name: updatedName } : product));
      setEditingProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className='w-full'>
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-l text-white uppercase bg-gradient-to-r from-green-700 to-green-500 dark:bg-gray-700 dark:text-gray-400 rounded-t-lg">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="py-4">
                  Product
                </th>
                <th scope="col" className="px-16 py-4">
                  Quantity
                </th>
                <th scope="col" className="py-3">
                  Category
                </th>
                <th scope="col" className="py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {products.map((product) => (
              <tbody key={product.id}>
                <tr className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.image} className="md:w-32 w-[100px] h-[100px] rounded-lg shadow-md" alt="" />
                  </td>
                  <td className="py-4 font-semibold text-black dark:text-white">
                    {editingProductId === product.id ? (
                      <div className='flex items-center'>
                        <input
                          type="text"
                          value={updatedName}
                          onChange={(e) => setUpdatedName(e.target.value)}
                          className='border rounded h-8 p-2 w-3/4'
                        />
                        <FaCheck className='text-green-500 ml-2 cursor-pointer' onClick={() => handleUpdate(product.id)} />
                      </div>
                    ) : (
                      <span className='flex items-center'>
                        <FaRegPenToSquare className='text-blue-700 cursor-pointer' onClick={() => handleEditClick(product.id, product.name)} />
                        {product.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button className="inline-flex p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        <span className="sr-only">{product.quantity}</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <input type="number" className="bg-gray-50 w-16 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-3" placeholder={product.quantity} required />
                      <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Increase Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-black dark:text-white">
                    {product.category}
                    <FaRegPenToSquare className=' text-blue-700 ml-2 mt-1 cursor-pointer' />
                  </td>
                  <td className="px-6 py-4 font-semibold text-black dark:text-white w-fit">
                    <p className="">{product.price} TND</p>
                    <FaRegPenToSquare className=' text-blue-700 cursor-pointer' />
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium flex text-red dark:text-red-500 hover:underline" onClick={() => openModal(product.id)}>
                      <MdDeleteForever size={26} /><span className='mt-1 ml-1'>Delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        {showModal && (
          <div id="popup-modal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2V9m4 9a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2h8z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    onClick={confirmDelete}
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default MarketPlace;