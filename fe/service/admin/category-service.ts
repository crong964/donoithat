'use server'
import { iMainCateGory } from "@/components/category/interface"
import { errorResponse } from "@/util/error-response"
import { api } from "@/util/fetch"
import { revalidatePath } from "next/cache"



export const getCategory = async (): Promise<iMainCateGory[]> => {
    try {
        let data = await api.get("/admin/category")
        return data.data
    } catch (error) {

    }
    return []
}

export const getCategoryInProduct = async (): Promise<iMainCateGory[]> => {
    try {
        let data = await api.get("/admin/category/product")
        return data.data
    } catch (error) {

    }
    return []
}
export const addCategory = async (currentState: any, formData: FormData) => {
    var form = new FormData()

    var image
    try {
        var imageFile = formData.get("imageFile") as File | undefined
        if (imageFile != null) {
            form.set("ImageFiles", imageFile)
            image = (await api.post("/admin/image/upload", form)).data
        }
    } catch (error) {
        return {
            error: true,
            message: "Tải file thất bại"
        }
    }
    const slug = formData.getAll("chidlrenSlug")
    const categoryChidlren = formData.getAll("chidlrenName")
        .filter(v => v.toString().length > 0)
        .map((v, i) => {
            return {
                slug: slug[i],
                nameCategory: v
            }
        })

    if (categoryChidlren.length <= 0) {
        return {
            error: true,
            message: "Chưa có phân loại con"
        }
    }
    const data = {
        "nameCategory": formData.get("name"),
        "slug": formData.get("slug"),
        "categoryChidlren": categoryChidlren,
        "categoryImage": image != undefined ? image[0] : ""
    }
    try {
        await api.post("/admin/category", data)

    } catch (error) {
        console.log((error as any)?.response?.data);

        return {
            error: true,
            message: "Thêm thất bại"
        }
    }
    revalidatePath("/admin/category")
}

export const getCategoryById = async (categoryId: string): Promise<iMainCateGory | undefined> => {
    try {
        let data = await api.get("/admin/category/id?categoryId=" + categoryId)
        return data.data
    } catch (error) {
        console.log((error as any).response?.data);

    }
    return undefined
}


export const removeCategoryById = async (currentState: any, formData: FormData) => {
    const categoryId = formData.get("categoryId")
    try {
        let data = await api.delete("/admin/category", {
            data: { categoryId: categoryId }
        })

    } catch (error) {
        console.log((error as any).response.data);
        return {
            error: true,
            message: (error as any).response.data
        }
    }
    revalidatePath("/")
}

export const editCategory = async (currentState: any, formData: FormData) => {

    var form = new FormData()

    var image
    try {
        var imageFile = formData.get("imageFile") as File | undefined
        if (imageFile != null) {
            form.set("ImageFiles", imageFile)
            image = (await api.post("/admin/image/upload", form)).data
        }
    } catch (error) {
        return {
            error: true,
            message: "Tải file thất bại"
        }
    }
    const data = {
        "categoryId": formData.get("categoryId"),
        "nameCategory": formData.get("nameCategory"),
        "slug": formData.get("slug"),
        "categoryImage": image != undefined ? image[0] : "",
    }
    try {
        await api.patch("/admin/category", data)

    } catch (error) {
        console.log((error as any)?.response?.data);

        return {
            error: true,
            message: "Thêm thất bại"
        }
    }
    revalidatePath("/admin/category")
}

export const addChildren = async (currentState: any, formData: FormData) => {

    const data = {
        "parentId": formData.get("parentId"),
        "nameCategory": formData.get("nameCategory"),
        "slug": formData.get("slug"),
    }
    try {
        await api.post("/admin/category/addchilred", data)

    } catch (error) {
        console.log((error as any)?.response?.data);

        return {
            error: true,
            message: "Thêm thất bại"
        }
    }
    revalidatePath("/admin/category")
}