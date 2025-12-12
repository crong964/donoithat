"use client";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import AddressModel from "./address-model";

export default function AddressAdd() {
  const [s, S] = useState(false);
  const handle = () => {
    S(!s);
  };
  return (
    <Fragment>
      <Button onClick={handle} variant={"default"}>
        Thêm địa chỉ mới
      </Button>
      <AddressModel onClick={handle} show={s} />
    </Fragment>
  );
}
