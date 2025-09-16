'use client'
import { IProductClassification } from "@/components/admin/product/interface"
import Coupon from "@/components/coupon/coupon"
import Navi, { iNavi } from "@/components/layout/navi"
import { iProductDetail } from "@/components/product/interface"
import ProductDelivery from "@/components/product/product-delivery"
import ProductDetail from "@/components/product/product-detail"
import ProductRelated from "@/components/product/product-related"
import ProductSaw from "@/components/product/product-saw"
import SaveProduct from "@/components/product/product-save"
import { CarouselNext, CarouselPrevious, MainCarousel } from "@/components/ui/carousel"
import PriceFormat from "@/util/Price"
import { Fragment, useEffect, useMemo, useState } from "react"
import CartProductAddButton from "./cart-product-add-button"

export default function ProductSlug(productdetail: iProductDetail) {
    const [variants, setVariants] = useState<string[]>([])
    const [curIndexProductVariant, setCurIndexProductVariant] = useState(0)
    const [curIndexImage, setCurIndexImage] = useState(0)
    const [quality, setQuality] = useState(1)
    const product = productdetail.productDetail
    const slug = product.slug
    const cate = productdetail.productDetail.categotyProductDetail
    const productImages = product.imageEntities
    const productVariants = product.productVariantModels
    const navi: iNavi[] = [{
        name: cate.nameCategory,
        url: `/collections/${cate.slug}`
    }, { name: product.nameProduct, url: `/product/${slug}` }]
    const productClassification = JSON.parse(product.productClassification) as IProductClassification[]
    const relatedProducts = productdetail.relatedProducts

    useEffect(() => {
        let newvariants = []
        for (let i = 0; i < productClassification.length; i++) {
            const element = productClassification[i];
            newvariants.push(element.options[0].id)
        }

        setVariants([...newvariants])
        return () => {

        };
    }, []);
    useEffect(() => {
        let options = ""

        for (let u = 0; u < variants.length; u++) {
            const element = variants[u];
            options += `${element} `
        }
        options = options.trim()
        for (let index = 0; index < productVariants.length; index++) {
            const element = productVariants[index];
            if (element.variantId == options) {
                setCurIndexProductVariant(index)
                break
            }
        }
        return () => {

        };
    }, [variants, productVariants]);

    const choseOption = (index: number, id: string) => {
        variants[index] = id
        setVariants([...variants])
    }
    const increase = () => {
        if (quality >= productVariants[curIndexProductVariant].quality) {
            setQuality(productVariants[curIndexProductVariant].quality)
            return
        }
        setQuality(x => x + 1)
    }
    const decrease = () => {
        if (quality <= 1) {
            setQuality(1)
            return
        }
        setQuality(x => x - 1)
    }
    const curquality = useMemo(() => {
        return productVariants[curIndexProductVariant].quality
    }, [productVariants[curIndexProductVariant].quality])

    const productVariant =
        useMemo(() => {
            return productVariants[curIndexProductVariant]
        }, [productVariants[curIndexProductVariant]])


    return (
        <>
            <SaveProduct
                nameProduct={product.nameProduct}
                quality={product.quality as any}
                slug={product.slug}
                suplier={product.slug}
                key={product.slug}
                imageUrls={product.imageEntities}
                mainPrice={product.mainPrice}
                imageUrl="" />
            <div className="max-lg:hidden">
                <Navi ls={navi} />
            </div>
            <section className="lg:px-3.75">
                <div className="flex max-lg:flex-col">
                    <div className="lg:w-[45%] ">
                        <div className="sticky top-0">
                            <div className="flex max-lg:flex-col bg-white h-max">
                                <ol className="w-21.25 p-2 max-lg:hidden">
                                    <MainCarousel orientation="vertical" className="flex flex-col  h-100 ">
                                        {
                                            productImages
                                                .map((v, i) => {
                                                    return (
                                                        <li key={v} className="mb-2 w-17.25">
                                                            <span className="">
                                                                <img className={`${i == curIndexImage ? "border-f " : ""} max-w-full h-auto  border`}
                                                                    src={v}
                                                                    alt={product.nameProduct} srcSet="" />
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                        }
                                    </MainCarousel>
                                </ol>
                                <div className="flex-1 relative ">
                                    <MainCarousel action={
                                        <>
                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 pl-3 flex space-x-2 lg:space-x-2.5 ">
                                                <CarouselPrevious />

                                            </div>
                                            <div className="absolute top-1/2 right-0 -translate-y-1/2 pr-3 flex space-x-2 lg:space-x-2.5 ">
                                                <CarouselNext />

                                            </div>
                                        </>}
                                        onSected={(i) => {
                                            setCurIndexImage(i)
                                        }}
                                    >
                                        {
                                            productImages
                                                .map((v) => {
                                                    return (
                                                        <div key={v} className="basis-full shrink-0 grow-0">
                                                            <span className="w-full">
                                                                <img className="max-w-full h-auto "
                                                                    src={v}
                                                                    alt={product.nameProduct} srcSet="" />
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                        }
                                    </MainCarousel>

                                </div>
                                <div className="p-2 lg:hidden">
                                    <MainCarousel >
                                        {
                                            productImages
                                                .map((v) => {
                                                    return (
                                                        <li key={v} className="basis-22.5 shrink-0 grow-0 max-lg:pr-2">
                                                            <span className="w-full">
                                                                <img className="max-w-full h-auto border-f border"
                                                                    src={v}
                                                                    alt={product.nameProduct} srcSet="" />
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                        }
                                    </MainCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[55%]  lg:pl-3.75">
                        <div className=" bg-white px-3.75">
                            <div className="pt-3.75 mb-3.75">
                                <h1 className="text-[24px] font-bold text-f mb-1.25 leading-7.25">{product.nameProduct}</h1>
                                <span className="text-[14px] flex flex-wrap gap-4.75 leading-5 ">
                                    <span>Mã sản phẩm:  <b className="text-f">{productVariants[curIndexProductVariant].productVariantId}</b> </span>
                                    <span>Tình trạng:  <b className="text-f">{curquality == 0 ?
                                        "hết hàng" : ` ${curquality} sản phẩm có sẵn`} </b> </span>
                                    <span>Thương hiệu:   <b className="text-f">{product.suplier}</b> </span>
                                </span>
                            </div>
                            <div className="p-3.75 bg-[#fafafa]">
                                <div className="flex items-center ">
                                    <span className="w-1/5 font-semibold text-[14px]">Giá:</span>
                                    <span style={{ color: "red" }} className="text-[28px] font-semibold">
                                        {PriceFormat(product.mainPrice + "")} đ
                                    </span>
                                </div>
                            </div>
                            {
                                productClassification.length > 1 ?
                                    <ol className="px-3.75 pb-3.75 bg-[#fafafa]">
                                        {
                                            productClassification.map((v, i) => {
                                                return (
                                                    <li key={v.id} className="flex  items-center mt-3.75">
                                                        <span className="basis-1/7 font-semibold text-[14px]">{v.name}</span>
                                                        <div className="flex-1">
                                                            <ol className="flex flex-wrap text-f">
                                                                {
                                                                    v.options.map((vo) => {
                                                                        return (
                                                                            <Fragment key={vo.id}>
                                                                                {variants[i] == vo.id ?
                                                                                    <li onClick={() => choseOption(i, vo.id)} className="text-[12px] mb-2 mr-2 rounded-xs cursor-pointer px-2.5 py-1.75 border-f border font-semibold">

                                                                                        <p className="px-2.5">{vo.name}</p>
                                                                                    </li> :
                                                                                    <li onClick={() => choseOption(i, vo.id)} className="text-[12px] mb-2 mr-2 rounded-xs cursor-pointer px-2.5 py-1.75 border-white border font-semibold">
                                                                                        <p className="px-2.5">{vo.name}</p>
                                                                                    </li>}
                                                                            </Fragment>
                                                                        )
                                                                    })
                                                                }
                                                            </ol>
                                                        </div>

                                                    </li>
                                                )
                                            })
                                        }
                                    </ol> : <></>
                            }
                            {
                                curquality == 0 ?
                                    <></> :
                                    <div className="pt-3.75 mb-3.75">
                                        <div className="flex px-3.75 items-center ">
                                            <span className="w-1/5 font-semibold text-[14px]">Số lượng:</span>
                                            <button onClick={() => decrease()} className="size-9.75 cursor-pointer flex items-center justify-center">
                                                <svg focusable="false" className="size-3 " viewBox="0 0 10 2" role="presentation">
                                                    <path d="M10 0v2H0V0z"></path>
                                                </svg>
                                            </button>
                                            <div className="size-9.75  flex items-center justify-center">
                                                <p>{quality}</p>
                                            </div>
                                            <button onClick={() => increase()} className="size-9.75 cursor-pointer flex items-center justify-center">
                                                <svg focusable="false" className="size-3 " viewBox="0 0 10 10" role="presentation">
                                                    <path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div style={{ lineHeight: "normal" }} className="mt-3.75 tracking-letter flex text-[15px] font-bold">
                                            <CartProductAddButton
                                                productVariantId={productVariant.productVariantId}
                                                curquality={quality} />
                                        </div>
                                    </div>
                            }

                            <ProductDelivery />
                        </div>
                        <div className="">
                            <div className="lg:p-3.75 mt-3.75 bg-white">
                                <div className="flex flex-wrap max-lg:hidden -mx-1.75 -mb-2.5">
                                    {Array.from({ length: 3 })
                                        .map((_, i) => {
                                            return (
                                                <div key={i} className="basis-1/2 grow-0 px-1.75 mb-3.75 ">
                                                    <Coupon />
                                                </div>
                                            )
                                        })}
                                </div>
                                <div className="lg:hidden">
                                    <MainCarousel >
                                        {Array.from({ length: 3 })
                                            .map((_, i) => {
                                                return (
                                                    <div key={i} className="basis-6/7 shrink-0 grow-0 px-1.75 mb-3.75 ">
                                                        <Coupon />
                                                    </div>
                                                )
                                            })}
                                    </MainCarousel>
                                </div>
                            </div>
                        </div>
                        <ProductDetail />

                    </div>
                </div>
            </section>
            <ProductRelated ls={relatedProducts} />
            <ProductSaw />
        </>
    )
}