"use client"

import Link from "next/link"
import { useState } from "react"

export default function Sign() {
    const [s, sS] = useState(false)
    return (
        <div className="lg:ml-5 relative mb-auto ">
            <button onClick={() => {
                sS(true)
            }} className="flex cursor-pointer items-center gap-0.5 lg:pt-0.5  h-full">
                <span className="w-8 h-10 flex justify-center items-end">
                    <svg className="w-4.5 lg:w-5.5 h-full " viewBox="0 0 1024 1024">
                        <path className="path1" d="M486.4 563.2c-155.275 0-281.6-126.325-281.6-281.6s126.325-281.6 281.6-281.6 281.6 126.325 281.6 281.6-126.325 281.6-281.6 281.6zM486.4 51.2c-127.043 0-230.4 103.357-230.4 230.4s103.357 230.4 230.4 230.4c127.042 0 230.4-103.357 230.4-230.4s-103.358-230.4-230.4-230.4z"></path>
                        <path className="path2" d="M896 1024h-819.2c-42.347 0-76.8-34.451-76.8-76.8 0-3.485 0.712-86.285 62.72-168.96 36.094-48.126 85.514-86.36 146.883-113.634 74.957-33.314 168.085-50.206 276.797-50.206 108.71 0 201.838 16.893 276.797 50.206 61.37 27.275 110.789 65.507 146.883 113.634 62.008 82.675 62.72 165.475 62.72 168.96 0 42.349-34.451 76.8-76.8 76.8zM486.4 665.6c-178.52 0-310.267 48.789-381 141.093-53.011 69.174-54.195 139.904-54.2 140.61 0 14.013 11.485 25.498 25.6 25.498h819.2c14.115 0 25.6-11.485 25.6-25.6-0.006-0.603-1.189-71.333-54.198-140.507-70.734-92.304-202.483-141.093-381.002-141.093z"></path>
                    </svg>
                </span>
                <span className="max-lg:hidden text-[13px] leading-[19px]">
                    Đăng nhập / Đăng ký
                    <span className="block flex items-center gap-1">Tài khoản của tôi
                        <svg className=" size-3.25" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                    </span>
                </span>
            </button>

            <div className={s ? "" : "hidden"}>
                <div className="absolute animate-cate pt-3 z-30 top-full text-text-shop -left-1/2">
                    <span className="flex justify-center">
                        <svg viewBox="0 0 20 9" className="w-4.5 fill-white" role="presentation">
                            <path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"></path>
                        </svg>
                    </span>
                    <div className="w-85 border-boder  border shadow-pro rounded-sm bg-white ">
                        <div className="px-5 py-3.75">
                            <div className="pb-2 mb-5 text-center border-b border-boder">
                                <h2 className="text-[18px] uppercase text-f tracking-wider font-medium">Đăng nhập tài khoản</h2>
                                <p className=" mt-1.25 text-[14px]">Nhập email và mật khẩu của bạn:</p>
                            </div>
                            <div>
                                <div className="mb-3 relative">
                                    <label className=" h-max" htmlFor="">
                                        <span className="text-[11px] font-normal absolute top-1 px-2.5">Email</span>
                                        <input type="text" className="text-[12px] h-10.5 pt-3.5 pb-0.75 w-full px-2.5 border border-boder focus:outline-none" />
                                    </label>
                                </div>
                                <div className=" relative">
                                    <label className=" h-max" htmlFor="">
                                        <span className="text-[11px] font-normal absolute top-1 px-2.5">Mật khẩu</span>
                                        <input type="password" className="text-[12px] h-10.5 pt-3.5 pb-0.75 w-full px-2.5 border border-boder focus:outline-none" />
                                    </label>
                                </div>
                                <div className="pt-1.5 text-[13px] leading-4.75 mb-3 font-normal text-left text-[#9e9e9e]">
                                    This site is protected by reCAPTCHA and the Google
                                    <a className="text-blue-500" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer"> Privacy Policy</a>
                                    and <a className="text-blue-500" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a>  <br /> apply.
                                </div>
                                <button className="px-7 w-full bg-f text-white text-center h-10.5 rounded-full">
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="mt-4 text-[12px]">
                                <div className="mb-1">Khách hàng mới? <Link href="/account/register" className="text-f">Tạo tài khoản</Link></div>
                                <div className="mb-1">Quên mật khẩu?  <Link href="#" className="text-f">Khôi phục mật khẩu</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={() => {
                    sS(false)
                }} className="w-screen h-screen fixed top-0  left-0 z-20">

                </div>
            </div>

        </div>
    )
}