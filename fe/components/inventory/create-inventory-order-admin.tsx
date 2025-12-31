"use client";
import React, { useActionState, startTransition, useEffect } from "react";
import { iSuplierAndImportPrice } from "@/components/variant/interface";
import TooltipCustom from "../ui-custom/tooltip-custom";
import { Button } from "../ui/button";
import priceFormat from "@/util/price-format";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { createInventoryOrderAdmin } from "@/service/admin/inventory-order-service";

const CreateInventoryOrderAdmin = ({
  importPrice,
  inventoryId,
  suplierAddress,
  suplierEmail,
  suplierId,
  suplierName,
  suplierPhoneNumber,
}: iSuplierAndImportPrice) => {
  const [mess, addForm, pedding] = useActionState(
    createInventoryOrderAdmin,
    null
  );
  const onAddOrder = () => {
    const formData = new FormData();
    formData.set("inventoryId", inventoryId);
    formData.set("suplierId", suplierId);
    startTransition(() => {
      addForm(formData);
    });
  };
  useEffect(() => {
  
    if (!mess) {
      return;
    }
    if (mess.error) {
      toast.error(mess.message);
      return;
    }
    if (!mess.error) {
      toast.success(mess.message);
      return;
    }

    return () => {};
  }, [mess]);
  return (
    <tr>
      <td className="py-3 pr-3">{suplierName}</td>
      <td className="py-3 pr-3">{suplierAddress}</td>
      <td className="py-3 pr-3">{suplierPhoneNumber}</td>
      <td className="py-3 pr-3">{suplierEmail}</td>
      <td className="py-3 pr-3">{priceFormat(importPrice + "")}</td>
      <th>
        <TooltipCustom content="Đặt hàng">
          <Button
            disabled={pedding}
            variant={"ghost"}
            onClick={() => onAddOrder()}
          >
            <ShoppingCart />
          </Button>
        </TooltipCustom>
      </th>
    </tr>
  );
};

export default CreateInventoryOrderAdmin;
