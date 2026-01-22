import BrandHearderLayout from "@/components/route/admin/brand/brand-hearder-layout";
import React from "react";

const BrandLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 ">
      <BrandHearderLayout></BrandHearderLayout>
      {children}
    </div>
  );
};

export default BrandLayout;
