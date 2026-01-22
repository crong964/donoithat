"use client";
import { startTransition, useActionState, useEffect } from "react";
import { iInventoryOrderAdmin } from "./interface";
import priceFormat from "@/util/price-format";
import TooltipCustom from "@/components/ui-custom/tooltip-custom";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteInventoryOrderAdmin } from "@/service/admin/inventory-order-service";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import ProtectAction from "../permission/protect-action";

const InventoryOrderAdmin = ({
  inventoryId,
  imagePath,
  productVariantName,
  receiedQuality,
  suplierId,
  suplierName,
  suplierPhoneNumber,
}: iInventoryOrderAdmin) => {
  const [mess, deleteForm, pedding] = useActionState(
    deleteInventoryOrderAdmin,
    null,
  );
  const onDeleteOrder = () => {
    const formData = new FormData();
    formData.set("inventoryId", inventoryId);
    formData.set("suplierId", suplierId);
    startTransition(() => {
      deleteForm(formData);
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
    <tr className="text-sm cursor-pointer hover:bg-a **:data-[row]:p-2 **:data-[row]:text-center **:data-[row]:border-b">
      <td data-row>
        <Checkbox id="terms" className="border-black" />
      </td>
      <td data-row>
        <div className="flex items-center gap-4">
          <img
            className="size-25 border object-cover border-boder"
            src={imagePath}
            alt={productVariantName}
            srcSet=""
          />
          <p>{productVariantName}</p>
        </div>
      </td>
      <td data-row>{suplierName}</td>
      <td data-row>{suplierPhoneNumber}</td>
      <td data-row>{priceFormat(receiedQuality)}</td>
      <td data-row>
        <ProtectAction permission="follower.inventory.delete">
          <TooltipCustom content="Xóa">
            <Button
              disabled={pedding}
              variant={"ghost"}
              onClick={() => onDeleteOrder()}
            >
              <Trash2 />
            </Button>
          </TooltipCustom>
        </ProtectAction>
      </td>
    </tr>
  );
};

export default InventoryOrderAdmin;
