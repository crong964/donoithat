import ImportAddAdminForm from "@/components/route/admin/warehouse/import/add-import-form";
import BackButton from "@/components/ui-custom/back-button";

import React from "react";

const ImportAddPage = () => {
  return (
    <>
      <div className="p-3 mb-3">
        <BackButton />
        <div className="text-2xl font-bold mt-3">Tạo phiếu nhập</div>
      </div>
      <ImportAddAdminForm />
    </>
  );
};

export default ImportAddPage;
