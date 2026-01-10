"use client";
import PriceFormat from "@/util/price-format";
import { Switch } from "../ui/switch";
import { iProduct } from "./interface-admin";
import { Badge } from "../ui/badge";
import { PencilLine, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useActionState, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Form from "next/form";
import { updateVarient } from "@/service/admin/variant-service";
import SubmitButton from "../ui-custom/submit-buttom";
import VariantsHomeItem from "../variant/variant-home-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import data from "@/tempdata/data";
import {
  deleteProduct,
  updateStatusProduct,
} from "@/service/admin/product-service";
import { toast } from "react-toastify";

export default function ProductHomeAdmin(p: iProduct) {
  const total = p.productVariants.reduce((pre, cur) => {
    return pre + cur.quality;
  }, 0);
  const dis = useRef<HTMLTableRowElement>(null);
  const dis1 = useRef<HTMLTableRowElement>(null);
  const [deleteMess, deleteForm] = useActionState(deleteProduct, null);
  const [updateStatusMess, updateStatusForm] = useActionState(
    updateStatusProduct,
    null
  );
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(p.status == 1);
  useEffect(() => {
    let f = undefined;
    if (deleteMess?.error) {
      toast.error(deleteMess.message);
      setOpen(false);
    }
    if (deleteMess?.error == false) {
      toast.success("Xóa thành công");
      setDel(true);
      setOpen(false);
      f = setTimeout(() => {
        let c = dis.current;
        let c1 = dis1.current;
        if (c && c1) {
          c.style = "display:none";
          c1.style = "display:none";
        }
      }, 1900);
    }
    return () => {
      if (f) {
        clearTimeout(f);
      }
    };
  }, [deleteMess, dis, dis1]);

  useEffect(() => {
    if (!updateStatusMess) {
      return;
    }
    if (updateStatusMess?.error) {
      toast.error(updateStatusMess.message);
    } else {
      toast.error(updateStatusMess.message);
      setStatus(updateStatusMess.newValue == 1);
    }
  }, [updateStatusMess]);
  const [del, setDel] = useState(false);
  return (
    <Fragment>
      <tr
        data-del={del}
        ref={dis}
        className="border-t border-black pt-2 data-[del=true]:animate-delete"
      >
        <td>
          <div className="space-x-3 flex flex-col cursor-pointer gap-y-3 items-center justify-center">
            <Form action={updateStatusForm}>
              <input type="hidden" name="productId" value={p.productId} />
              <div>{status ? "Công khai" : "Ẩn"}</div>

              <SubmitButton loading={<Switch checked={status} />}>
                <Button type="submit" variant={"ghost"}>
                  <Switch checked={status} />
                </Button>
              </SubmitButton>
            </Form>
          </div>
        </td>
        <td className="py-3.75">
          <div className="flex h-full space-x-2 items-center">
            <div className="basis-20 ">
              <img
                className="min-w-20 border border-boder h-auto"
                src={p.imageUrls[0]}
                alt={p.nameProduct}
                srcSet=""
              />
            </div>
            <div className="flex-1 h-full">
              <h3 className=" max-md:line-clamp-1 leading-4.5 ">
                {p.nameProduct}
              </h3>
            </div>
          </div>
        </td>
        <td className="text-center">
          {p.categoryName != "" ? (
            <Link href={`/admin/product?slug=${p.categorySlug}`}>
              <Badge variant={"secondary"}>{p.categoryName}</Badge>
            </Link>
          ) : (
            ""
          )}
        </td>
        <td className="text-center pb-3.75">
          {PriceFormat(p.mainPrice + "")}₫
        </td>
        <td className="text-center pb-3.75">{total}</td>
        <td>
          <div className="flex space-x-2.5 justify-end items-center">
            <AlertDialog open={open}>
              <AlertDialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="ghost">
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Bạn có chắc muốn chỉnh sửa dữ liệu
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <p>
                      Việc xóa sẽ khiến sản phẩm không con trên web dữ liệu cũ
                      vẫn sẽ còn
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-between">
                  <AlertDialogCancel asChild>
                    <Button onClick={() => setOpen(false)} variant={"ghost"}>
                      Hủy{" "}
                    </Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Form action={deleteForm}>
                      <input
                        type="hidden"
                        name="productId"
                        value={p.productId}
                      />
                      <SubmitButton loading={undefined}>
                        <Button type="submit">Đồng ý</Button>
                      </SubmitButton>
                    </Form>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      </tr>
      <tr data-del={del} ref={dis1} className="data-[del=true]:animate-delete ">
        <td colSpan={6} className="my-6">
          <Collapsible className="group/collapsible">
            <CollapsibleTrigger asChild>
              <div className="my-5 text-center">
                <Button variant={"outline"}>
                  Mở rộng {p.productVariants.length}
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {p.productVariants.map((v) => {
                  return <VariantsHomeItem key={v.productVariantId} {...v} />;
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </td>
      </tr>
    </Fragment>
  );
}
