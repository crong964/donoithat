import SubmitButton from "@/components/button/submit-buttom";
import { iCateGory } from "@/components/category/interface";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogDescription, AlertDialogTitle, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { removeCategoryById, editCategory, addChildren } from "@/service/admin/category-service";
import removeAccents from "@/util/remove-accents";

import { ImageUp, Pen, SquarePlus, Ban } from "lucide-react";
import Form from "next/form";
import { useState, useActionState, useEffect } from "react";

export default function EditMainCategoryForm(p: iCateGory) {
    const [open, setOpen] = useState(false)
    const [mess, formAction, pending] = useActionState(removeCategoryById, null)
    const [mess2, formEditAction, pending2] = useActionState(editCategory, null)
    const [mainCategory, setMainCategory] = useState<iCateGory>({
        id: "",
        nameCategory: "",
        slug: "",
        categoryId: "",
        categoryImage: ""
    })
    useEffect(() => {
        setMainCategory({ ...p })

        return () => {

        };
    }, [p.id]);
    return (
        <section className=" bg-white p-2 mb-5 rounded-sm shadow-form">
            <div>
                <input type="hidden" name="categoryId" value={p.categoryId} />
                <div>
                    <div className="flex items-center relative">
                        <div className="absolute top-0 right-0 pr-5 pt-5">
                            <Button onClick={() => {
                                (document.getElementById("image") as any).value = null
                                setMainCategory({
                                    ...mainCategory, categoryImage: p.categoryImage
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

                            </div>
                        </label>
                    </div>
                </div>
                <div className="my-3.75">
                    <div className="flex">
                        <div className="basis-3/12">
                            <p>Tên loại chính</p>
                        </div>
                        <div className="flex-1">
                            <Input name="name" onChange={(v) => {
                                let text = v.currentTarget.value
                                setMainCategory({ ...mainCategory, nameCategory: text })
                            }} value={mainCategory?.nameCategory} />
                        </div>
                    </div>
                </div>
                <div className="my-3.75">
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
                </div>

            </div>
            <AlertDialog open={open} onOpenChange={(o) => setOpen(o)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc muốn xóa thể loại này?</AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <p className="text-3xl"> Việc bạn xóa sẽ làm mất vĩnh viễn</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-between">
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Form action={formAction}>
                                <input type="hidden" name="categoryId" value={p.categoryId} />
                                <Button type="submit">Xóa</Button>
                            </Form>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <footer className="mt-3.75 ">
                <ul className="flex justify-between">
                    <li>
                        <Form action={formEditAction}>
                            <input type="hidden" name="categoryId" value={mainCategory.categoryId} />
                            <input type="hidden" name="nameCategory" value={mainCategory.nameCategory} />
                            <input type="hidden" name="slug" value={mainCategory.slug} />
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
                            <SubmitButton loading={
                                <Button className="bg-loadingbg text-white" type="button" >
                                    <p>Chỉnh sửa</p>
                                    <Pen size={15} />
                                </Button>
                            }>
                                <Button className="bg-a hover:bg-f hover:text-a text-black" type="submit" >
                                    <p>Chỉnh sửa</p>
                                    <Pen size={15} />
                                </Button>
                            </SubmitButton>
                        </Form>

                    </li>

                    <li>
                        <Button onClick={() => setOpen(true)} type="button" variant="destructive">
                            <Ban size={15} />
                            <p>Xóa</p>
                        </Button>
                    </li>
                </ul>
            </footer>
        </section>
    )
}