"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetchTools } from "@/store/slices/marketplace";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";

const Page = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTools());
  }, [dispatch]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Market place" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Page;
