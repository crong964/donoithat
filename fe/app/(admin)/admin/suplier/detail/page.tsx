import BackButton from "@/components/ui-custom/back-button";
import { redirect } from "next/navigation";
import React from "react";

const SuplierDetailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ suplierId: string | undefined }>;
}) => {
  const suplierId = (await searchParams).suplierId;
  if (!suplierId) {
    redirect("/admin/suplier");
  }

  return (
    <>
      <div className="p-3">
        <BackButton/>
      </div>
      <div className="my-5 ">
        <h1 className="font-bold text-2xl">Thông tin nhà cung cấp </h1>
      </div>
			<div>

			</div>
    </>
  );
};

export default SuplierDetailPage;
