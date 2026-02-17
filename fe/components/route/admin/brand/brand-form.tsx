import ParallelModal from "@/components/ui-custom/parallel-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addBrand } from "@/service/admin/brand-service";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const BrandForm = () => {
  const [mess, addFrom, pedding] = useActionState(addBrand, null);
  useEffect(() => {
    if (!mess) {
      return;
    }
    if (mess.error) {
      toast.error("Thêm thất bại");
      return;
    }

    toast.success("Thêm thành công");
  }, [mess]);
  return (
    <ParallelModal url="/admin/brand/add" title="Thêm nhãn hàng">
      <Form action={addFrom}>
        <div className="grid gap-3">
          <Label htmlFor="brandName">
            Tên nhãn hàng <span className="text-red-500">*</span>
          </Label>
          <Input id="brandName" name="brandName" required />
          <div className="flex gap-x-2.5">
            <Link href={"/admin/brand"}>
              <Button variant={"destructive"}>Hủy</Button>
            </Link>
            <Button disabled={pedding} variant={"blue"}>
              Thêm
            </Button>
          </div>
        </div>
      </Form>
    </ParallelModal>
  );
};

export default BrandForm;
