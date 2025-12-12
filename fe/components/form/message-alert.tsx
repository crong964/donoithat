"use client";
import { memo, useEffect, useMemo } from "react";
import { iMessageAlert } from "./interface";
import { toast } from "react-toastify";

function MessageAlert(d: iMessageAlert) {
  useEffect(() => {
    switch (d?.err) {
      case true:
        toast.error(d.mess);
        break;
      default:
        toast.success(d.mess);
        break;
    }
  }, [d]);
  return <></>;
}

export default memo(MessageAlert);
