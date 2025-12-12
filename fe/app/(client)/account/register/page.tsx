"use client";
import SubmitButton from "@/components/button/submit-buttom";
import MessageAlert from "@/components/form/message-alert";
import { createUser } from "@/service/user-service";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [message, formAction, isPending] = useActionState(createUser, null);

  return (
    <div className="px-3.75">
      <MessageAlert {...message} />
      <div className="px-7.5 pb-7.5 pt-6.25 mt-6.75">
        <div className="max-w-155 mx-auto mt-8.75 mb-12.5 px-7.5 pb-7.5 pt-6.25 bg-white">
          <div className="mb-11.25 flex text-[24px]  font-bold justify-center">
            <h4 className="px-7.5 text-[#cacaca] leading-7.25 hover:text-black">
              <Link href="/account/login">Đăng nhập</Link>
            </h4>
            <h4 className="px-7.5 border-l-2 leading-7.25 border-black">
              <Link href="/account/register">Đăng ký</Link>
            </h4>
          </div>

          <Form action={formAction}>
            <div className="mb-6.25">
              <label htmlFor="">
                <input
                  required
                  type="text"
                  name="fullName"
                  value="a"
                  className="border-boder text-[14px] bg-input required focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                  placeholder="Họ và tên"
                />
              </label>
            </div>
            <div className="mb-6.25">
              <label htmlFor="">
                <input
                  value="a"
                  required
                  type="text"
                  name="phoneNumber"
                  className="border-boder text-[14px] bg-input required focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                  placeholder="Số điện thoại"
                />
              </label>
            </div>

            <div className="mb-6.25">
              <label htmlFor="">
                <input
                  value="huy91027@gmail.com"
                  required
                  type="email"
                  name="account"
                  className="border-boder text-[14px] bg-input required focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                  placeholder="Email"
                />
              </label>
            </div>
            <div className="mb-1.25">
              <label htmlFor="">
                <input
                  required
                  value="a"
                  type="password"
                  name="password"
                  className="border-boder text-[14px] bg-input required focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                  placeholder="Mật khẩu"
                />
              </label>
            </div>
            <div className="pt-1.5 mb-6.25 text-[#cacaca] text-[13px] leading-4.75 font-normal">
              This site is protected by reCAPTCHA and the Google
              <Link
                className="text-[#2962ff]"
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Privacy Policy
              </Link>
              and{" "}
              <Link
                className="text-[#2962ff]"
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Terms of Service
              </Link>{" "}
              apply.
            </div>
            <div className="flex items-center">
              <SubmitButton
                loading={
                  <button
                    type="button"
                    className="px-8.75 cursor-progress rounded-sm leading-11.25
                                         bg-loadingbg uppercase font-semibold text-white"
                  >
                    Đăng ký
                  </button>
                }
              >
                <button
                  type="submit"
                  className="px-8.75 cursor-pointer rounded-sm leading-11.25 bg-f uppercase font-semibold text-white"
                >
                  Đăng ký
                </button>
              </SubmitButton>

              <p className="pl-7.5 mr-auto text-[14px] leading-5 font-normal">
                Bạn đã có tài khoản?{" "}
                <Link className="text-[#2962ff]" href="/account/login">
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="mb-6.25 flex">
                            <label htmlFor="nn" className="mr-5">
                                <div className="relative pl-6">
                                    <input required type="radio" id="nn" name="sex" className="absolute size-4.5 left-0 top-1/2 -translate-y-1/2" />
                                    <span className=" text-[14px] font-normal mr-5">Nữ</span>
                                </div>
                            </label>
                            <label htmlFor="n" className="">
                                <div className="relative pl-6">
                                    <input required type="radio" id="n" name="sex" className="absolute size-4.5  left-0 top-1/2 -translate-y-1/2" />
                                    <span className=" text-[14px] font-normal mr-5">Nam</span>
                                </div>

                            </label>
                        </div> */
}
{
  /* <div className="mb-6.25">
                            <label htmlFor="">
                                <input required type="text" className="border-boder text-[14px] bg-input required focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                                    placeholder="mm/dd/yyyy" />
                            </label>
                        </div> */
}
