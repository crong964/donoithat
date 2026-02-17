import BrandHearderLayout from "@/components/route/admin/brand/brand-hearder-layout";
import React from "react";

const BrandLayout = ({
  add,
  children,
}: {
  children: React.ReactNode;
  add: React.ReactNode;
}) => {
  return (
    <div className="p-3.75">
      {add}
      <BrandHearderLayout />
      {children}
    </div>
  );
};

export default BrandLayout;
