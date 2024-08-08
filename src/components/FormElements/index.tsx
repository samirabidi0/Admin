"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useAppDispatch } from "@/hooks";
import { addTool } from "@/store/slices/marketplace";
import { useRouter } from "next/navigation";

const FormElements = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [newTool, setNewTool] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTool({
      ...newTool,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTool(newTool));
    router.push("/marketplace");
  };

  return (
    <>
      <Breadcrumb pageName="Create Product" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newTool.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTool.description}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newTool.price}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newTool.image}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newTool.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newTool.quantity}
                    onChange={handleChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                  />
                </div>
                <button
                  type="submit"
                  className="hover:bg-green-500-dark mt-4 rounded-lg bg-green-500 px-5 py-3 text-white transition"
                >
                  Add Tool
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;

// TODO: add image uploader
//   {/* <!-- File upload --> */}
// <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
// <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//   <h3 className="font-medium text-black dark:text-white">Image</h3>
// </div>
// <div className="flex flex-col gap-5.5 p-6.5">
//   <input
//     type="file"
//     className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-green-500 file:hover:bg-opacity-10 focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-green-700"
//   />
// </div>
// </div>
