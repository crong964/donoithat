"use client";
import Form from "next/form";
import MapLeafLet from "./map-leafLet";
import SubmitButton from "../ui-custom/submit-buttom";
import { Fragment, useActionState, useEffect, useState } from "react";
import { addAddresses } from "@/service/address-service";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import LocationInput from "../location/location-input";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";

export default function AddressModel(p: {
  show: boolean;
  onClick(s: boolean): void;
}) {
  const [mess, formAction, pending] = useActionState(addAddresses, null);

  const [latlag, setLatLag] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const [dataForm, setDataForm] = useState({
    title: {
      error: false,
      value: "",
    },
    address: {
      error: false,
      value: "",
    },
    province: {
      error: false,
      value: "",
    },
  });

  const onHandleDataForm = (field: string, value: string) => {
    setDataForm({
      ...dataForm,
      [field]: {
        error: false,
        value: value,
      },
    });
  };
  useEffect(() => {
    switch (mess?.err) {
      case true:
        toast.error(mess.mess);

        break;
      case false:
        toast.success(mess.mess);
        break;
    }
    return () => {};
  }, [mess]);

  return (
    <div
      data-show={p.show}
      className="data-[show=true]:block data-[show=false]:hidden"
    >
      <div
        onClick={() => {
          p.onClick(p.show);
        }}
        className="fixed top-0 z-666 left-0 bg-[#99999961]  flex justify-center items-center   w-screen  h-screen "
      >
        <Form
          onSubmit={(e) => {
            if (dataForm.province.value.split(",").length < 2) {
              setDataForm({
                ...dataForm,
                province: {
                  error: true,
                  value: dataForm.province.value,
                },
              });
              e.preventDefault();
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          action={formAction}
          className="bg-white animate-big p-7.5 rounded-sm"
        >
          <h1 className="mb-3.75 text-2xl font-bold">Địa chỉ mới</h1>
          <div className=" pb-3.75">
            <Input
              name="title"
              required
              value={dataForm.title.value}
              onChange={(v) => {
                onHandleDataForm("title", v.currentTarget.value);
              }}
              placeholder="Đặt tên cho địa chỉ"
              type="text"
              className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5"
            />
          </div>
          <div className=" pb-3.75">
            <Input
              required
              onChange={(v) => {
                onHandleDataForm("address", v.currentTarget.value);
              }}
              placeholder="Địa chỉ"
              type="text"
              className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5"
            />
          </div>
          <input
            type="hidden"
            name="address"
            value={dataForm.address.value + dataForm.province.value}
          />
          <LocationInput
            onChange={(v) => {
              onHandleDataForm("province", v);
            }}
            error={dataForm.province.error}
            value={dataForm.province.value}
          />
          <Input type="hidden" name="lat" value={0} />
          <Input type="hidden" name="lng" value={0} />
          {/*<label className="mb-3.75 font-bold">Chọn vị trí trên map</label>
              <Input type="hidden" name="lat" value={latlag.lat} />
              <Input type="hidden" name="lng" value={latlag.lng} />
              {p.show ? (
                <MapLeafLet
                  onChange={(lat, lng) => {
                    setLatLag({ lat: lat, lng: lng });
                  }}
                />
              ) : (
                <></>
              )}*/}
          <div className="flex justify-between">
            <Button
              onClick={() => {
                p.onClick(p.show);
                setDataForm({
                  title: {
                    error: false,
                    value: "",
                  },
                  address: {
                    error: false,
                    value: "",
                  },
                  province: {
                    error: false,
                    value: "",
                  },
                });
              }}
              type="button"
              variant={"outline"}
              className="cursor-pointer border text-black bg-white px-3.75 py-3 rounded-sm"
            >
              Hủy
            </Button>
            <SubmitButton
              loading={
                <>
                  <Button
                    type="button"
                    className="cursor-progress bg-loadingbg px-3.75 py-3 rounded-sm"
                  >
                    Thêm vị trí loading
                  </Button>
                </>
              }
            >
              <Button
                type="submit"
                className="cursor-pointer text-white bg-f px-3.75 py-3 rounded-sm"
              >
                Thêm vị trí
              </Button>
            </SubmitButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
