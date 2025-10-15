'use client'
import Form from "next/form";
import MapLeafLet from "./map-leafLet";
import SubmitButton from "../button/submit-buttom";
import { Fragment, useActionState, useEffect, useState } from "react";
import { addAddresses } from "@/service/address-service";
import { toast } from "react-toastify";

export default function AddressModel(p: { show: boolean, onClick(s: boolean): void }) {
    const [mess, formAction, pending] = useActionState(addAddresses, null)
    const [latlag, setLatLag] = useState<{ lat: number, lng: number }>({
        lat: 0,
        lng: 0
    })
    useEffect(() => {
        switch (mess?.err) {
            case true:
                toast.error(mess.mess)

                break;
            case false:
                toast.success(mess.mess)
                break
        }
        return () => {

        };
    }, [mess]);
    return (
        <Fragment>
            {p.show ?
                <Fragment>
                    <div onClick={() => {
                        p.onClick(p.show)
                    }} className="fixed top-0 left-0 bg-[#99999961] z-999 flex justify-center items-center   w-screen  h-screen ">
                        <Form onClick={(e) => {
                            e.stopPropagation()
                        }} action={formAction} className="bg-white animate-big p-7.5 rounded-sm">
                            <h1 className="mb-3.75 text-2xl font-bold">
                                Địa chỉ mới
                            </h1>
                            <div className=" pb-3.75">
                                <input
                                    name="title"
                                    required
                                    placeholder="Đặt tên cho địa chỉ"
                                    type="text"
                                    className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                            </div>
                            <div className=" pb-3.75">
                                <input
                                    name="address"
                                    required
                                    placeholder="Địa chỉ"
                                    type="text"
                                    className="h-10 focus:outline-none px-3 w-full border-boder border py-1.5" />
                            </div>
                            <label className="mb-3.75 font-bold">
                                Chọn vị trí trên map
                            </label>
                            <input type="hidden" name="lat" value={latlag.lat} />
                            <input type="hidden" name="lng" value={latlag.lng} />
                            <MapLeafLet onChange={(lat, lng) => {
                                setLatLag({ lat: lat, lng: lng })
                            }} />
                            <div className="flex justify-between">
                                <button onClick={() => {
                                    p.onClick(p.show)
                                }} type="button" className="cursor-pointer border text-black bg-white px-3.75 py-3 rounded-sm">
                                    Hủy
                                </button>
                                <SubmitButton loading={<>
                                    <button type="button" className="cursor-progress bg-loadingbg px-3.75 py-3 rounded-sm">
                                        Thêm vị trí loading
                                    </button>
                                </>}>
                                    <button type="submit" className="cursor-pointer text-white bg-f px-3.75 py-3 rounded-sm">
                                        Thêm vị trí
                                    </button>
                                </SubmitButton>
                            </div>
                        </Form>
                    </div>
                </Fragment>
                :
                <Fragment></Fragment>
            }
        </Fragment>

    )
}