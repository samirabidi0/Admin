"use client";
import AddProdAction from "./actions";
import { useRouter } from "next/navigation";

const inputStyle =
  "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700";

const AddProduct = () => {
  const router = useRouter();
  const handleAddProduct = (e) => {
    AddProdAction(e, router);
  };
  return (
    <>
      <h2 className="mb-4 text-center text-2xl font-bold text-black md:mb-6 md:text-left">
        Add New Product
      </h2>
      <div className="mx-auto rounded bg-white p-6 shadow-md md:p-8">
        <form action={handleAddProduct}>
          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="productName"
            >
              Product Name
            </label>
            <input
              className={inputStyle}
              id="productName"
              type="text"
              name="name"
              placeholder="Product Name"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className={inputStyle}
              id="category"
              type="text"
              name="category"
              placeholder="Category"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className={inputStyle}
              id="price"
              type="number"
              name="price"
              placeholder="Price"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className={inputStyle}
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Quantity"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={inputStyle}
              id="description"
              placeholder="Description"
              name="description"
            />
          </div>

          <div className="mb-4">
            <label
              className="text-gray-700 mb-2 block text-sm font-bold"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-green-500 file:hover:bg-opacity-10 focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-green-700"
              id="image"
              type="file"
              name="image"
            />
          </div>
          <button
            className="hover:bg-green-500-dark mt-4 w-full rounded-lg bg-green-500 px-5 py-3 text-white transition"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
