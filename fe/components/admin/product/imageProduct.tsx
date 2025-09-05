"use client"
import { setOpen } from "@/redux/admin/product/mediaLibraryRedux";
import { RootState } from "@/redux/admin/reduxRoot";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
interface IimageProduct {
    onchange(i: number): void
}
export default function ImageProduct(p: IimageProduct) {
    // call this to Disable


    function preventDefault(e: any) {
        e.preventDefault();
        return
    }

    const imageurls = useSelector((state: RootState) => state.product.imageurls)
    const open = useSelector((state: RootState) => state.mediaLibrary.open)
    const dispatch = useDispatch()
    useEffect(() => {
        if (open) {
            document.body.style = "overflow: hidden"

        } else {
            document.body.style = ""
        }
        return () => {
        };
    }, [open]);
    return (
        open ?
            <>
                <button onClick={() => {
                    dispatch(setOpen(false))

                }} className="fixed w-screen h-screen top-0 left-0 z-666 bg-a opacity-30"></button>
                <div className="fixed top-1/2 left-1/2 -translate-1/2 z-999 shadow-2xl bg-white w-200 min-h-50">
                    <div className="p-4">
                        <h1 className="text-2xl px-4 font-bold">
                            Thư viện ảnh {imageurls.length}
                        </h1>
                        <div className="pt-4 px-4">
                            <hr />
                        </div>
                        <div className="max-h-150 overflow-y-auto">
                            <div className="h-max">
                                <div className="grid grid-cols-5 gap-2.5 ">
                                    {imageurls.map((v, i) => {
                                        return (
                                            <div key={v} className="aspect-square col-span-1">
                                                <button onClick={() => {
                                                    p.onchange(i)
                                                    dispatch(setOpen(false))
                                                }} className="w-full hover:shadow-2xl h-full cursor-pointer" >
                                                    <img src={v} className="w-full h-full object-cover" />
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> :
            <></>
    )
}