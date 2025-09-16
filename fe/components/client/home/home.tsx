import Coupon from "@/components/coupon/coupon";
import { iGetProduct } from "@/components/product/interface";
import ProductHome from "@/components/product/product-home";
import ProductItem from "@/components/product/product-item";
import { CarouselNext, CarouselPrevious, MainCarousel } from "@/components/ui/carousel";
import Link from "next/link";

export default function Home(data: iGetProduct) {

    if (data == null || data.productModels == null) {
        return <></>
    }
    const product = data.productModels
    return (
        <>
            <div className="lg:px-3.75">
                <img src="/slide_4_mb.jpg" className="w-full lg:hidden object-cover h-auto" alt="" srcSet="" />
                <img src="/slide_1_img.jpg" className="w-full max-lg:hidden object-cover h-auto" alt="" srcSet="" />
            </div>
            <section className="mt-7.5 pb-17.5 px-3.75">
                <MainCarousel>
                    {Array.from({ length: 4 })
                        .map((v, i) => {
                            return (
                                <div key={i} className="basis-10/13 lg:basis-1/4 grow-0 shrink-0 max-lg:pl-3.75 lg:px-3.75 h-max cursor-pointer relative ">
                                    <div className=" overflow-hidden ">
                                        <img src="/categorybanner_1_img.jpg" className="w-full h-full object-cover hover:scale-110 duration-500 " alt="" srcSet="" />
                                    </div>
                                    <div className="w-full -z-0 absolute bottom-0 left-0 px-5 py-2.5">
                                        <div className="text-center text-[18px] leading-5 font-bold text-f">Phòng khách</div>
                                        <div className="text-center">xem ngay</div>
                                    </div>
                                </div>
                            )
                        })}
                </MainCarousel>
            </section>
            <section className="pb-7.5 relative lg:px-3.75">
                <div className=" lg:px-1.75 py-3.75 bg-collection1-bg rounded-sm">
                    <div className="px-6 lg:px-3 flex items-center space-x-2.5 mb-3.75">
                        <span className="relative flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-f opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-f"></span>
                        </span>
                        <Link href="#" className="text-[18px] lg:text-[24px] font-bold leading-4.5 lg:leading-7">Đồ bếp nhập khẩu cao cấp</Link>
                    </div>
                    <MainCarousel action={
                        <>
                            <div className="absolute flex space-x-2.5 top-0 right-0 pr-7.5 pt-3.75 max-lg:hidden">
                                <CarouselPrevious />
                                <CarouselNext />
                            </div>
                        </>}>
                        {product
                            .map((v, i) => {
                                return (
                                    <ProductHome {...v} key={v.slug} />
                                )
                            })}
                    </MainCarousel>
                    <div className="flex text-[14px] mt-3.75 leading-4 justify-center">
                        <Link href="#" className="py-3 px-1.25 flex space-x-4 justify-center rounded-sm items-center bg-white min-w-80">
                            <span> Xem tất cả</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="inline-block fill-black" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="pb-10 lg:pb-17.5 ">
                <MainCarousel >
                    {Array.from({ length: 4 })
                        .map((v, i) => {
                            return (
                                <div key={i} className="basis-11/12 grow-0 shrink-0 lg:basis-1/4 px-1.75 ">
                                    <Coupon />
                                </div>
                            )
                        })}
                </MainCarousel>
            </section>
            <section className="lg:px-3.75 pb-17.5 relative">
                <div className="mb-5 max-lg:px-3.75">
                    <h2 className="text-[18px] lg:text-[24px] font-bold leading-7.25 text-f">
                        <Link href="#" >Back To School - Up To 60%</Link>
                    </h2>
                </div>
                <MainCarousel action={
                    <>
                        <div className="absolute top-0 right-0 pr-3 flex space-x-2 lg:space-x-2.5 ">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </>}>
                    {product
                        .map((v, i) => {
                            return (
                                <ProductHome {...v} key={v.slug} />
                            )
                        })}

                </MainCarousel>
            </section>
            <section className="pb-17.5">
                <div className="px-3.75" >
                    <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/categorize_img.jpg")` }}
                        className="w-full bg-contain lg:px-5 py-1.75 flex items-center ">
                        <div className="px-3.75 basis-1/6 max-lg:hidden">
                            <div className="text-white flex-col flex items-end">
                                <p className="text-[18px] leading-6.25 font-semibold mb-2">Xu hướng tìm kiếm</p>
                                <div>
                                    <Link style={{ lineHeight: "normal" }} className="uppercase text-[13px] font-medium py-1.25 px-3.75 rounded-2xl bg-f" href="/">
                                        xem ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="basis-5/6 overflow-x-hidden">
                            <div className="lg:px-3.75  lg:mx-3.75">
                                <MainCarousel className="flex justify-between">
                                    {Array.from({ length: 8 })
                                        .map((_, i) => {
                                            return (
                                                <div key={i} className="max-lg:basis-1/3 my-2 basis-33 grow-0 shrink-0">
                                                    <div className="flex cursor-pointer flex-col justify-around items-center px-3.75">
                                                        <div className="mx-1.25">
                                                            <div className="bg-white hover:shadow-cate-hover w duration-500 rounded-full p-2.5">
                                                                <img src="/categorize_1_img.jpg" className="w-full" alt="" srcSet="" />
                                                            </div>
                                                        </div>
                                                        <div className=" text-white my-3.5">
                                                            <h3>
                                                                <Link className="" href="/">Ghê</Link>
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </MainCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lg:px-3.75">
                <div className="flex max-lg:flex-col justify-between lg:items-center mb-5">
                    <div className="max-lg:mb-3.5">
                        <h1 className="text-[24px] leading-7.25 font-bold text-f">Sản phẩm nổi bật</h1>
                    </div>
                    <div className="">
                        <ul className=" font-bold h-auto flex items-center">
                            <li>
                                <Link href="#" className="px-4 py-2.5 text-[14px] leading-5  rounded-full border text-white bg-f">Sản phẩm mới
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="px-4 py-2.5 text-[14px] leading-5 rounded-full text-[#787878] border border-[#eae4e8] ml-5">
                                    Sofa New Arrival
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                    <div className="max-lg:hidden basis-1/5 ">
                        <img src="/home_coll_1_banner.jpg" className="w-full h-auto" alt="" srcSet="" />
                    </div>
                    <div className=" lg:basis-4/5 lg:pl-3.5">
                        <div className="flex flex-wrap">
                            {product
                                .filter((_, i) => {
                                    return i < 10
                                })
                                .map((v, i) => {
                                    return (
                                        <ProductItem key={v.slug} {...v}></ProductItem>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className="mt-6.25 text-center">
                    <Link href="#" className="px-6.25 py-2.5 tracking-wider border text-center text-f border-f text-sm hover:text-white rounded-sm hover:bg-f ">
                        Xem tất cả <strong>Sản phẩm mới </strong>
                    </Link>
                </div>
            </section>

        </>
    );
}
