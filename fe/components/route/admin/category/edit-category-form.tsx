'use client'
import SubmitButton from "@/components/button/submit-buttom";
import { iCateGory, iMainCateGory } from "@/components/category/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addCategory, addChildren, editCategory, removeCategoryById } from "@/service/admin/category-service";
import removeAccents from "@/util/remove-accents";
import { Ban, ImageUp, Pen, Plus, SquarePlus, Trash } from "lucide-react";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditMainCategoryForm from "./edit-main-caregory-form";


export default function EditCategoryForm(p: iMainCateGory) {
    const [chidlrenItem, setChidlrenItem] = useState<iCateGory[]>([])
    const [mess2, formeditAction, pending2] = useActionState(editCategory, null)
    const [mess3, formeChildrenAction, pending3] = useActionState(addChildren, null)



    useEffect(() => {
        setChidlrenItem([...p.categoryChidlren, { id: "", nameCategory: "", slug: "" }])
        return () => {
        };
    }, [p.id]);

    useEffect(() => {
        if (mess2?.error) {
            toast.error(mess2.message)
        }
        return () => {

        };
    }, [mess2]);
    useEffect(() => {
        if (mess3?.error) {
            toast.error(mess3.message)
        }
        return () => {

        };
    }, [mess3]);

    return (
        <>
            <header>
                <h1 className="text-2xl font-bold">
                    <p>Chỉnh sửa thể loại</p>
                </h1>
            </header>
            <EditMainCategoryForm {...p} />

            <section className="bg-white p-2 rounded-sm shadow-form">
                <div >
                    <p className="text-center font-bold">Tên loại phụ</p>
                </div>
                <div className="flex">
                    <div className="flex-1">
                        {
                            chidlrenItem.map((v, i) => {
                                return (
                                    <div key={v.categoryId || i} className="flex mb-3.75 space-x-3">
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
                                            i != chidlrenItem.length - 1 && v.categoryId ?
                                                <>
                                                    <Button variant={"destructive"} color="" type="button">
                                                        <Trash />
                                                    </Button>
                                                    <Form action={formeditAction}>
                                                        <input type="hidden" name="categoryId" value={v.categoryId} />
                                                        <input type="hidden" name="nameCategory" value={v.nameCategory} />
                                                        <input type="hidden" name="slug" value={v.slug} />
                                                        <SubmitButton loading={
                                                            <Button variant={"default"} type="button">
                                                                <Pen />
                                                            </Button>}>
                                                            <Button variant={"blue"} type="submit">
                                                                <Pen />
                                                            </Button>
                                                        </SubmitButton>
                                                    </Form>

                                                </>
                                                :
                                                <></>
                                        }
                                        {
                                            v.categoryId == undefined && i != chidlrenItem.length - 1 ?
                                                <>
                                                    <Form action={formeChildrenAction}>
                                                        <input type="hidden" name="parentId" value={p.categoryId} />
                                                        <input type="hidden" name="nameCategory" value={v.nameCategory} />
                                                        <input type="hidden" name="slug" value={v.slug} />
                                                        <SubmitButton loading={
                                                            <Button variant={"default"} type="button">
                                                                <Plus color="white" />
                                                            </Button>}>
                                                            <Button variant={"blue"} type="submit">
                                                                <Plus color="white" />
                                                            </Button>
                                                        </SubmitButton>

                                                    </Form>

                                                </> : <></>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </section>
        </>
    )
}