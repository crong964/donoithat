"use client";
import { iImportProduct } from "@/components/inventory/interface";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import priceFormat from "@/util/price-format";
import { ChevronDownIcon, Trash } from "lucide-react";
import Form from "next/form";
import {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import SearchImportProductInput from "./search-import-product-input";
import SearchSuplierInput from "./search-suplier-input";
import { toast } from "react-toastify";
import { addImportAdmin } from "@/service/admin/import-service";
const ImportAddAdminForm = () => {
  const [open, setOpen] = useState(false);
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [importProducts, setImportProducts] = useState<iImportProduct[]>([]);
  const [suplier, setSuplier] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [purchaseInvoiceId, setPurchaseInvoiceId] = useState("");
  const [mess, formAdd, pending] = useActionState(addImportAdmin, null);

  const onDeleteImportProduct = (importProductId: string) => {
    setImportProducts([
      ...importProducts.filter((importProduct) => {
        return importProduct.productVariantId != importProductId;
      }),
    ]);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suplier?.id == "") {
      toast.error("Chưa chọn nhà cung cấp");
      return;
    }
    if (importProducts.length <= 0) {
      toast.error("Chưa chọn sản phẩm");
      return;
    }
    const data = new FormData();
    data.set("purchaseInvoiceId", purchaseInvoiceId);
    data.set("suplierId", suplier.id);
    data.set("receivedDate", curDate.getTime() + "");
    data.set("importVariantProducts", JSON.stringify(importProducts));

    startTransition(() => {
      formAdd(data);
    });
  };
  const totlePrice = useMemo(() => {
    let totlePrice = 0;
    importProducts.forEach((element) => {
      totlePrice += element.importPrice * element.quality;
    });

    return totlePrice;
  }, [importProducts]);

  useEffect(() => {
    if (mess == null) {
      return;
    }
    if (mess.error) {
      toast.error(mess?.message);
    }

    if (!mess.error) {
      toast.success("Thêm thành công");
      setImportProducts([]);
      setSuplier({ id: "", name: "" });
    }
  }, [mess]);

  return (
    <form onSubmit={onSubmit} className="px-3">
      <FieldSet>
        <div className="grid grid-cols-3 gap-4">
          <Field className="flex flex-col gap-3">
            <FieldLabel htmlFor="date" className="px-1">
              Ngày nhập hàng <span className="text-red-400">*</span>
            </FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {curDate ? curDate.toLocaleDateString() : "Chọn ngày nhập"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  pagedNavigation
                  mode="single"
                  buttonVariant={"ghost"}
                  selected={curDate}
                  timeZone="UTC"
                  onSelect={(date) => {
                    setCurDate(date || curDate);
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
          <Field>
            <FieldLabel>
              Nhà cung cấp <span className="text-red-400">*</span>
            </FieldLabel>
            <SearchSuplierInput
              name={suplier?.name || ""}
              id={suplier?.id || ""}
              select={setSuplier}
            />
          </Field>
          <Field>
            <FieldLabel>Mã phiếu mua hàng</FieldLabel>
            <Input
              value={purchaseInvoiceId}
              placeholder="Mã phiếu mua hàng"
              onChange={(v) => {
                const text = v.currentTarget.value;
                setPurchaseInvoiceId(text);
              }}
            />
          </Field>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-80">Tên sản phẩm</th>
              <th className="w-50">Giá nhập</th>
              <th className="w-50">Số lượng</th>
              <th>Tổng tiền</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {importProducts.length == 0 && <tr className="h-50"></tr>}
            {importProducts.map((importProduct) => {
              return (
                <tr key={importProduct.productVariantId}>
                  <td className=" p-2">
                    <div className="flex gap-3 items-start">
                      <img
                        className="w-13 h-auto"
                        src={importProduct.imagePath}
                      />
                      <p className="text-sm">
                        {importProduct.productVariantName}
                      </p>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <Input
                      placeholder="Giá nhập hàng"
                      value={priceFormat(importProduct.importPrice + "")}
                      onChange={(v) => {
                        let n = parseInt(
                          v.currentTarget.value.replaceAll(",", "")
                        );

                        importProducts.forEach((item) => {
                          if (
                            item.productVariantId ==
                            importProduct.productVariantId
                          ) {
                            if (isNaN(n)) {
                              item.importPrice = 0;
                              return;
                            }
                            item.importPrice = n;
                          }
                        });
                        setImportProducts([...importProducts]);
                      }}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <Input
                      onChange={(v) => {
                        let n = parseInt(
                          v.currentTarget.value.replaceAll(",", "")
                        );
                        importProducts.forEach((item) => {
                          if (
                            item.productVariantId ==
                            importProduct.productVariantId
                          ) {
                            if (isNaN(n)) {
                              item.quality = 0;
                              return;
                            }
                            item.quality = n;
                          }
                        });
                        setImportProducts([...importProducts]);
                      }}
                      placeholder="Số lượng nhập"
                      value={priceFormat(importProduct.quality + "")}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <p>
                      {priceFormat(
                        importProduct.quality * importProduct.importPrice + ""
                      )}
                    </p>
                  </td>
                  <td className="w-20 text-center">
                    <Button
                      onClick={() =>
                        onDeleteImportProduct(importProduct.productVariantId)
                      }
                      type="button"
                      variant={"destructive"}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td className="w-80 p-4">
                <SearchImportProductInput
                  importProducts={importProducts}
                  selectImportProduct={setImportProducts}
                />
              </td>
            </tr>
            <tr className="bg-a">
              <td colSpan={3} className="py-4">
                <p className="font-bold text-2xl text-center">Tổng tiền</p>
              </td>
              <td>
                <p className="font-bold text-2xl text-center">
                  {priceFormat(totlePrice + "")}
                </p>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </FieldSet>
      <div className="mt-3">
        <Button disabled={pending} variant={"blue"}>
          Tạo phiếu nhập kho
        </Button>
      </div>
    </form>
  );
};

export default ImportAddAdminForm;
