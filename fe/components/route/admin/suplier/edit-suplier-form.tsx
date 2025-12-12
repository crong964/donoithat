"use client";
import SubmitButton from "@/components/button/submit-buttom";
import MessageAlert from "@/components/form/message-alert";
import { iSuplier } from "@/components/suplier/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addSuplier, updateSuplier } from "@/service/admin/suplier-service";
import { Ban, CornerDownLeft, Plus, Save } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SuplierAdminEditForm(d: iSuplier) {
  const [message, formAction, pending] = useActionState(updateSuplier, null);
  const [data, setData] = useState<iSuplier>({
    id: "",
    suplierAddress: "",
    suplierEmail: "",
    suplierId: "",
    suplierName: "",
    suplierPhoneNumber: "",
  });
  const onChange = (p: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = p.target;
    const t = { ...data } as any;
    if (!Object.hasOwn(data, name)) return;

    t[name] = value;
    setData({ ...t });
  };
  useEffect(() => {
    setData({ ...d });
    return () => {};
  }, [d]);
  return (
    <div className="p-4 flex">
      <MessageAlert {...message} />
      <div>
        <div className="p-4  flex space-x-3.5 items-center ">
          <Link href={"/admin/suplier"}>
            <Button type="button" variant={"blue"}>
              <CornerDownLeft />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-4 overflow-x-auto w-full">
        <p className="p-4 border border-[#00000014] mb-3.75">
          {" "}
          Cập nhật nhà cung cấp
        </p>
        <Form action={formAction}>
          <input type="hidden" name="id" value={d.id} />
          <label className="flex mb-3.75" htmlFor="">
            <p className="basis-sm">
              Mã nhà cung cấp <span className="text-f">*</span>
            </p>
            <Input
              onChange={onChange}
              required
              value={data.suplierId}
              title="chưa nhập"
              name="suplierId"
              placeholder="Nhập mã nhà cung cấp"
            />
          </label>
          <label className="flex mb-3.75" htmlFor="">
            <p className="basis-sm">
              Tên nhà cung cấp <span className="text-f">*</span>
            </p>
            <Input
              required
              onChange={onChange}
              name="suplierName"
              value={data.suplierName}
              placeholder="Nhập tên nhà cung cấp"
            />
          </label>
          <label className="flex mb-3.75" htmlFor="">
            <p className="basis-sm">
              Điện thoại <span className="text-f">*</span>
            </p>
            <Input
              required
              onChange={onChange}
              name="suplierPhoneNumber"
              value={data.suplierPhoneNumber}
              placeholder="Nhập số điện nhà cung cấp"
            />
          </label>
          <label className="flex mb-3.75" htmlFor="">
            <p className="basis-sm">Địa chỉ </p>
            <Input
              required
              onChange={onChange}
              name="suplierAddress"
              value={data.suplierAddress}
              placeholder="Nhập địa chỉ nhà cung cấp"
            />
          </label>
          <label className="flex mb-3.75" htmlFor="">
            <p className="basis-sm">Email liên lạc</p>
            <Input
              required
              type="email"
              onChange={onChange}
              name="suplierEmail"
              value={data.suplierEmail}
              placeholder="Nhập địa chỉ nhà cung cấp"
            />
          </label>
          <div className="justify-center flex">
            <div>
              <SubmitButton
                loading={
                  <Button type="button" className="bg-loadingbg">
                    <Save /> Lưu
                  </Button>
                }
              >
                <Button className="bg-f hover:bg-red-500">
                  <Save /> Lưu
                </Button>
              </SubmitButton>
              <Link href={"/admin/suplier"}>
                <Button className="bg-f hover:bg-red-500">
                  <Ban /> hủy
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
