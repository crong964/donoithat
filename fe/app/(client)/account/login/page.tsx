'use client'
import SubmitButton from "@/components/button/submitbuttom";
import { loginUser } from "@/service/userService";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [message, formAction, isPending] = useActionState(loginUser, undefined)
    useEffect(() => {
        toast.error(message)

        return () => {

        };
    }, [message]);
    return (
        <div className="px-3.75">
            <div className="px-7.5 pb-7.5 pt-6.25 mt-6.75">
                <div className="max-w-155 mx-auto mt-8.75 mb-12.5 px-7.5 pb-7.5 pt-6.25 bg-white">
                    <div className="mb-11.25 flex text-[24px]  font-bold justify-center">
                        <h4 className="px-7.5  leading-7.25 hover:text-black">
                            <Link href="/account/login">Đăng nhập</Link>
                        </h4>
                        <h4 className="px-7.5 text-[#cacaca] border-l-2 leading-7.25 border-black">
                            <Link href="/account/register">Đăng ký</Link>
                        </h4>
                    </div>

                    <Form action={formAction}>
                        <div className="mb-6.25">
                            <label htmlFor="">
                                <input type="email"
                                    name="account"
                                    value="huy91027@gmail.com"
                                    className="border-boder text-[14px] bg-input focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                                    placeholder="Vui lòng nhập email của bạn" />
                            </label>
                        </div>
                        <div className="">
                            <label htmlFor="">
                                <input
                                    value="a"
                                    name="password"
                                    type="password" className="border-boder text-[14px] bg-input focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                                    placeholder="Vui lòng nhập mật khẩu" />
                            </label>
                        </div>
                        <div className="pt-1.5 mb-6.25 text-[#cacaca] text-[13px] leading-4.75 font-normal">
                            This site is protected by reCAPTCHA and the Google
                            <Link className="text-[#2962ff]" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer"> Privacy Policy </Link>
                            and <Link className="text-[#2962ff]" href="https://policies.google.com/terms" target="_blank" rel="noreferrer"> Terms of Service</Link> apply.
                        </div>
                        <div className="flex items-center">
                            <SubmitButton
                                loading={
                                    <button type="button"
                                        className="px-8.75 cursor-progress rounded-sm leading-11.25
                                         bg-loadingbg uppercase font-semibold text-white"
                                    >
                                        Đăng nhập
                                    </button>}
                            >
                                <button type="submit"
                                    className="px-8.75 cursor-pointer rounded-sm leading-11.25 bg-f uppercase font-semibold text-white"
                                >
                                    Đăng nhập
                                </button>
                            </SubmitButton>
                            <div className="pl-7.5 mr-auto text-[14px] leading-5 font-normal">
                                <p>Bạn chưa có tài khoản? <Link className="text-[#2962ff]" href="/account">Quên mật khẩu?</Link></p>
                                <p>Bạn quên mật khẩu? <Link className="text-[#2962ff]" href="/account/register">Đăng ký</Link> </p>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}