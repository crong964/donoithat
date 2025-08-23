export default function IndexPage() {
    return (
        <div className="px-3.75">
            <div className="px-7.5 pb-7.5 pt-6.25 mt-6.75">
                <div className="max-w-155 mx-auto mt-8.75 mb-12.5 px-7.5 pb-7.5 pt-6.25 bg-white">
                    <div className="mb-11.25 flex text-[24px]  font-bold justify-center">
                        <h4 className="px-7.5  leading-7.25 hover:text-black">
                            <a href="/account/login">Đăng nhập</a>
                        </h4>
                        <h4 className="px-7.5 text-[#cacaca] border-l-2 leading-7.25 border-black">
                            <a href="/account/register">Đăng ký</a>
                        </h4>
                    </div>

                    <form>
                        <div className="mb-6.25">
                            <label htmlFor="">
                                <input type="text" className="border-boder text-[14px] bg-input focus:bg-white  border focus:outline-none px-5 py-1.25 w-full italic font-medium h-13.75"
                                    placeholder="Vui lòng nhập email của bạn" />
                            </label>
                        </div>
                        <div className="pt-1.5 mb-6.25 text-[#cacaca] text-[13px] leading-4.75 font-normal">
                            This site is protected by reCAPTCHA and the Google
                            <a className="text-[#2962ff]" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer"> Privacy Policy </a>
                            and <a className="text-[#2962ff]" href="https://policies.google.com/terms" target="_blank" rel="noreferrer"> Terms of Service</a> apply.
                        </div>
                        <div className="flex items-center">
                            <input type="submit" className="px-8.75 text-[14px] rounded-sm leading-11.25 bg-f uppercase font-semibold text-white" value="Đăng nhập" />
                            <p className="pl-7.5 mr-auto text-[14px] leading-5 font-normal">Quay lại  <a className="text-[#2962ff]" href="/account/login">đăng nhập</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}