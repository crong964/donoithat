"use client"
import SubmitButton from "@/components/button/submitbuttom";
import { updateUser } from "@/service/userService";
import Form from "next/form";
import { useActionState } from "react";

export default function UserInfor(p: {
    fullName: string;
    account: string;
    phoneNumber: string;
    address: string;
}) {
    const [message, formAction, pending] = useActionState(updateUser, null)
    const infor = p
    return (
        <>
            <div className="mx-7.5">
                <h1 className="text-f text-lg py-4.5 font-bold">
                    Hồ sơ cá nhân
                </h1>

                <Form action={formAction} className="">
                    <table className="table-auto w-full">
                        <tr className="">
                            <td className="pb-7.5">
                                <label htmlFor="fullName">
                                    Họ tên
                                </label>
                            </td>
                            <td className="pl-5 pb-7.5">
                                <input type="text" name="fullName" id="fullName" placeholder={infor.fullName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-7.5">
                                Tên đăng nhâp
                            </td>
                            <td className="pl-5 pb-7.5">
                                {infor.account}
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-7.5">
                                Số điện thoại
                            </td>
                            <td className="pl-5 pb-7.5">
                                {infor.phoneNumber}
                            </td>
                        </tr>
                    </table>
                    <div className="flex justify-center ">
                        <SubmitButton loading={
                            <button className="bg-loadingbg text-white px-3 py-2">
                                Đang cập nhật
                            </button>
                        }>
                            <button className="bg-f text-white px-3 py-2">
                                Lưu
                            </button>
                        </SubmitButton>
                    </div>
                </Form>

            </div>
        </>
    )
}