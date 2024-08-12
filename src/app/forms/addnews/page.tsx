"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddExpertAction from "./actions";
import { useRouter } from "next/navigation";

const styleInput =
  "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700";

const FormLayout = () => {
  const router = useRouter();
  const handleAddNews = (e) => {
    AddExpertAction(e, router);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create news post" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <form action={handleAddNews}>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter your first name"
                    className={styleInput}
                  />
                </div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  placeholder="Content"
                  className="mb-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-green-700"
                ></textarea>
                <div className="mb-4">
                  <label
                    className="text-gray-700 mb-2 block text-sm font-bold"
                    htmlFor="image"
                  >
                    Upload Thumbnail
                  </label>
                  <input
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-green-500 file:hover:bg-opacity-10 focus:border-green-700 active:border-green-700 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-green-700"
                    id="image"
                    type="file"
                    name="image"
                  />
                </div>
                <button className="flex w-full justify-center rounded bg-green-500 p-3 font-medium text-gray hover:bg-opacity-90">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
