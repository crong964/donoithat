'use client'
import SubmitButton from "@/components/button/submit-buttom"
import { iCateGory } from "@/components/category/interface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { RootState } from "@/redux/admin/reduxRoot"
import { addCategory } from "@/service/admin/category-service"
import removeAccents from "@/util/remove-accents"
import { Ban, ImageUp, Pen, Settings, SquarePlus, Trash } from "lucide-react"
import Form from "next/form"
import { useActionState, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

export default function AddCategoryForm() {
    const [mainCategory, setMainCategory] = useState<iCateGory>({
        id: "",
        nameCategory: "",
        slug: "",
        categoryId: "",
        categoryImage: ""
    })
    const [chidlrenItem, setChidlrenItem] = useState<iCateGory[]>([{
        id: "",
        nameCategory: "",
        slug: ""
    }])
    const [mess, formAction, pending] = useActionState(addCategory, null)
    useEffect(() => {
        if (mess?.error) {
            toast.error(mess.message)
        }
        if (mess?.error == false) {
            toast.success("thanh công")
        }
        return () => {

        };
    }, [mess]);
    return (
        <>
            <header>
                <h1 className="text-2xl font-bold">
                    <p>Thêm thể loại mới</p>
                </h1>
            </header>
            <Form action={formAction} className=" bg-white p-2 rounded-sm shadow-form">
                <section>
                    <div className="flex items-center relative">
                        <div className="absolute top-0 right-0 pr-5 pt-5">
                            <Button onClick={() => {
                                (document.getElementById("image") as any).value = null
                                setMainCategory({
                                    ...mainCategory, categoryImage: ""
                                })
                            }} variant={"outline"} type="button" className="p-3">
                                xóa
                            </Button>
                        </div>
                        <div className="basis-3/12">
                            <p>Ảnh</p>
                        </div>
                        <label htmlFor="image" className="flex-1 size-40 border">
                            <div className="flex justify-center items-center h-full">
                                {mainCategory.categoryImage == "" || mainCategory.categoryImage == undefined ?
                                    <ImageUp /> : <img className="object-cover  size-40 " src={mainCategory.categoryImage} />}
                                <input onChange={(v) => {
                                    const files = v.currentTarget.files
                                    const file = files?.item(0)
                                    if (file && file.type.indexOf("image") >= 0) {
                                        const s = URL.createObjectURL(file)
                                        setMainCategory({
                                            ...mainCategory, categoryImage: s
                                        })
                                    } else {
                                        setMainCategory({
                                            ...mainCategory, categoryImage: ""
                                        })
                                    }
                                }} type="file" id="image" name="imageFile" className="hidden" />
                            </div>
                        </label>
                    </div>
                </section>
                <section className="my-3.75">
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Tên loại chính</p>
                        </div>
                        <div className="flex-1">
                            <Input name="name" onChange={(v) => {
                                let text = v.currentTarget.value
                                setMainCategory({
                                    ...mainCategory, nameCategory: text
                                })
                            }} value={mainCategory?.nameCategory} />
                        </div>
                    </div>
                </section>
                <section className="my-3.75">
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Slug</p>
                        </div>
                        <div className="flex-1">
                            <div className="flex space-x-3">
                                <Input onChange={(v) => {
                                    let text = v.currentTarget.value
                                    setMainCategory({
                                        ...mainCategory, slug: text
                                    })
                                }} name="slug" value={mainCategory?.slug} />

                                <Button onClick={() => {
                                    setMainCategory({
                                        ...mainCategory, slug: removeAccents(mainCategory.nameCategory)
                                    })
                                }} type="button" variant={"ghost"}>
                                    <Pen />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Tên loại phụ</p>
                        </div>
                        <div className="flex-1">
                            {
                                chidlrenItem.map((v, i) => {
                                    return (
                                        <div key={i} className="flex mb-3.75 space-x-3">
                                            <Input key={i} onChange={(tv) => {
                                                let text = tv.currentTarget.value
                                                if (i == chidlrenItem.length - 1) {
                                                    chidlrenItem.push({ id: i + 1 + "", nameCategory: "", slug: "", categoryImage: "" })
                                                }
                                                let tmp = [...chidlrenItem]
                                                tmp[i].nameCategory = text
                                                tmp[i].slug = removeAccents(text)
                                                setChidlrenItem([...tmp])
                                            }} placeholder="Nhập" name="chidlrenName" value={v.nameCategory} />
                                            <input type="hidden" name="chidlrenSlug" value={v.slug} />
                                            {
                                                i != chidlrenItem.length - 1 ?
                                                    <Button onClick={() => {
                                                        setChidlrenItem([...chidlrenItem.filter((v, vi) => vi != i)])
                                                    }} type="button">
                                                        <Trash />
                                                    </Button> :
                                                    <></>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </section>
                <footer className="mt-3.75">
                    <ul className="flex justify-between">
                        <li>
                            <SubmitButton loading={
                                <Button className="bg-loadingbg text-white" type="button" >
                                    <p>Thêm</p>
                                    <SquarePlus size={15} />
                                </Button>
                            }>
                                <Button className="bg-a hover:bg-f hover:text-a text-black" type="submit" >
                                    <p>Thêm</p>
                                    <SquarePlus size={15} />
                                </Button>
                            </SubmitButton>

                        </li>

                        <li>
                            <Button type="button" variant="destructive">
                                <Ban size={15} />
                                <p>Hủy</p>
                            </Button>
                        </li>
                    </ul>
                </footer>
            </Form>
        </>
    )
}