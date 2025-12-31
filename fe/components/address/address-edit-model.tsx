"use client";
import Form from "next/form";
import MapLeafLet from "./map-leafLet";
import SubmitButton from "@/components/ui-custom/submit-buttom";
import { Fragment, useActionState, useEffect, useState } from "react";
import { editAddresses } from "@/service/address-service";
import { toast } from "react-toastify";
import { iAddress } from "./interface";

export default function AddressEditModel(p: {
  show: boolean;
  onClick(s: boolean): void;
  data: iAddress;
}) {
  const [mess, formAction, pending] = useActionState(editAddresses, null);
  const [latlag, setLatLag] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [data, setData] = useState<iAddress>({
    address: "",
    addressId: "",
    lat: 0,
    lng: 0,
    title: "",
  });
  useEffect(() => {
    setData({ ...p.data });
    return () => {};
  }, []);

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
  const handChange = (t: React.ChangeEvent<HTMLInputElement>) => {
    const v = t.target;

    for (const key in data) {
      if (!Object.hasOwn(data, key)) continue;
      if (v.name == key) {
        // @ts-ignore
        data[key] = v.value;
        setData({ ...data });
      }
    }
  };
  return (
    <Fragment>
      {p.show ? (
        <div
          className="fixed top-0 left-0  z-999 flex 
                justify-center items-center  
        w-screen  h-screen  bg-[#99999961]"
        >
          <Form
            action={formAction}
            className="bg-white animate-big p-7.5 rounded-sm"
          >
            <h1 className="mb-3.75 text-2xl font-bold">Chỉnh sủa địa chỉ</h1>
            <input
              name="addressId"
              required
              value={data.addressId}
              placeholder="Đặt tên cho địa chỉ"
              type="hidden"
              className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5"
            />
            <div className=" pb-3.75">
              <input
                name="title"
                required
                onChange={handChange}
                value={data.title}
                placeholder="Đặt tên cho địa chỉ"
                type="text"
                className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5"
              />
            </div>
            <div className=" pb-3.75">
              <input
                name="address"
                required
                placeholder="Địa chỉ"
                onChange={handChange}
                value={data.address}
                type="text"
                className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5"
              />
            </div>
            <label className="mb-3.75 font-bold">Chọn vị trí trên map</label>
            <input type="hidden" name="lat" value={latlag.lat} />
            <input type="hidden" name="lng" value={latlag.lng} />
            <MapLeafLet
              latlng={{ lat: data.lat, lng: data.lng }}
              onChange={(lat, lng) => {
                setLatLag({ lat: lat, lng: lng });
              }}
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  p.onClick(p.show);
                }}
                type="button"
                className="cursor-pointer border text-black bg-white px-3.75 py-3 rounded-sm"
              >
                Hủy
              </button>
              <SubmitButton
                loading={
                  <>
                    <button
                      type="button"
                      className="cursor-progress bg-loadingbg px-3.75 py-3 rounded-sm"
                    >
                      Chỉnh sửa...
                    </button>
                  </>
                }
              >
                <button
                  type="submit"
                  className="cursor-pointer text-white bg-f px-3.75 py-3 rounded-sm"
                >
                  Chỉnh sửa
                </button>
              </SubmitButton>
            </div>
          </Form>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}
