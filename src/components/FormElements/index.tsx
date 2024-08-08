// "use client";

// import { useState } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import { useAppDispatch } from "@/hooks";
// import { addTool } from "@/store/slices/marketplace";
// import { useRouter } from "next/navigation";
// import UploadImage from "../../helpers/uploadImage"
// const FormElements = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const [newTool, setNewTool] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     image: "",
//     category: "",
//     quantity: 0,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewTool({
//       ...newTool,
//       [name]: name === "price" || name === "quantity" ? Number(value) : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", newTool.image)
//     const ImageFile = formData.get('image')
//     const ImageUrl = await UploadImage(ImageFile)
//     console.log(ImageUrl)
//     dispatch(addTool(newTool));
//     router.push("/marketplace");
//   };

//   return (
//     <>
//       <Breadcrumb pageName="Create Product" />
//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
//         <div className="flex flex-col gap-9">
//           {/* <!-- Input Fields --> */}
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Input Fields
//               </h3>
//             </div>
//             <div className="flex flex-col gap-5.5 p-6.5">
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={newTool.name}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     name="description"
//                     placeholder="Description"
//                     value={newTool.description}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     value={newTool.price}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
//                   />
//                 </div>
//                 <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//                   <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//                     <h3 className="font-medium text-black dark:text-white">
//                       Image
//                     </h3>
//                   </div>
//                   <div className="flex flex-col gap-5.5 p-6.5">
//                     <input
//                       type="file"
//                       className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-green-500 file:hover:bg-opacity-10 focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-green-700"
//                       name= "image"
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     name="category"
//                     placeholder="Category"
//                     value={newTool.category}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Quantity
//                   </label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     placeholder="Quantity"
//                     value={newTool.quantity}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="hover:bg-green-500-dark mt-4 rounded-lg bg-green-500 px-5 py-3 text-white transition"
//                 >
//                   Add Tool
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FormElements;
"use client"
import AddProdAction from './actions'


const AddProduct = () => {

 

  return (
    <div className="max-w-lg mx-auto bg-white p-6 md:p-8 border border-gray-200 rounded-lg shadow-md mt-8">
       
      <h2 className="text-2xl font-bold mb-4 md:mb-6 text-center md:text-left">Add New Product</h2>
      <form action={AddProdAction} >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productName"
            type="text"
            name='name'
            placeholder="Product Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            name = "category"
            placeholder="Category"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name = "price"
            placeholder="Price"
           
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            name="quantity"
            type="number"
            placeholder="Quantity"
            
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            name = "description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name='image'
          />
        </div>
        <div className="flex items-center justify-between">  
          <button
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto ml-24" 
            type="submit"
          > 
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;