import React from "react";
import BackButton from "./back-button";

const ActionHeader = ({ title }: { title: string }) => {
  return (
    <>
      <div className="p-3">
        <BackButton></BackButton>
      </div>
      <div className="p-3">
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </>
  );
};

export default ActionHeader;
