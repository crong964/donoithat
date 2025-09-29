'use client'
import { IProductClassification, IProductVariant } from '@/components/admin/product/interface'
import { createClassificationFormSaveToHandle } from '@/components/admin/product/ulti'
import { iProductDetail } from '@/components/product/interface-admin'
import data from '@/tempdata/data'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface iImageInput {
    file: File | undefined,
    url: string
}
export interface iProductState {
    productVariants: IProductVariant[]
    productVariantsInEdit: { [key: string]: IProductVariant | undefined }
    productClassifications: IProductClassification[]
    imageurls: iImageInput[],
    nameProduct: string,
    typeProduct: string
    description: string
    mainPrice: number
    minPrice: number
    maxPrice: number
    quality: number
    imageVariants: { [key: string]: number }
    vendor: string,
    weightProduct: {
        value: number,
        measure: string
    }
}

const initialState: iProductState = {
    productVariants: [],
    productClassifications: [],
    productVariantsInEdit: {},
    imageurls: [],
    maxPrice: 0,
    minPrice: 0,
    nameProduct: "",
    typeProduct: "",
    description: "",
    mainPrice: 0,
    imageVariants: {},
    vendor: "",
    quality: 0,
    weightProduct: {
        measure: "",
        value: 0
    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        swapImage: (state, action: PayloadAction<{ i1: number, i2: number }>) => {
            const i1 = action.payload.i1
            const i2 = action.payload.i2
            const temp = state.imageurls[i1]
            state.imageurls[i1] = state.imageurls[i2]
            state.imageurls[i2] = temp

        },
        addProductVariants: (state, action: PayloadAction<IProductVariant>) => {
            state.productVariants.push(action.payload)
        },
        addProductClassifications: (state, action: PayloadAction<IProductClassification>) => {
            state.productClassifications.push(action.payload)
        },
        removeProductClassifications: (state, action: PayloadAction<string>) => {
            state.productClassifications = state.productClassifications.filter((v, i) => {
                return v.id != action.payload
            })
            localStorage.setItem("temp", JSON.stringify(state.productClassifications))
        },
        addOptionInProductClassifications: (state, action: PayloadAction<{
            data: {
                id: string, name: string, edit: boolean
            },
            pci: number
        }>) => {

            state.productClassifications[action.payload.pci].options.push(action.payload.data)
        },
        removeOptionInProductClassifications: (state, action: PayloadAction<{
            oi: number,
            pci: number
        }>) => {
            state.productClassifications[action.payload.pci].options =
                state.productClassifications[action.payload.pci].options.filter((_, i) => {
                    return i != action.payload.oi
                })
            localStorage.setItem("temp", JSON.stringify(state.productClassifications))
        },
        editOptionInProductClassifications: (state, action: PayloadAction<{
            data: string,
            pci: number,
            oi: number
        }>) => {
            state.productClassifications[action.payload.pci]
                .options[action.payload.oi].name = action.payload.data
            localStorage.setItem("temp", JSON.stringify(state.productClassifications))
        },
        editProductClassifications: (state, action: PayloadAction<{
            data: string,
            pci: number,

        }>) => {
            state.productClassifications[action.payload.pci].name = action.payload.data
            localStorage.setItem("temp", JSON.stringify(state.productClassifications))
        },
        setProductClassifications: (state, action: PayloadAction<IProductClassification[]>) => {
            state.productClassifications = [...action.payload]
        },
        setProductVariants: (state, action: PayloadAction<IProductVariant[]>) => {
            state.productVariants = [...action.payload]
        },
        addImageUrlFiles: (state, action: PayloadAction<iImageInput[]>) => {
            state.imageurls = [...state.imageurls, ...action.payload]
        },
        removeImageUrls: (state, action: PayloadAction<number>) => {
            state.imageurls = state.imageurls.filter((_, i) => {
                return i != action.payload
            })
        }
        ,
        setNameProduct: (state, action: PayloadAction<string>) => {
            state.nameProduct = action.payload
        },
        setTypeProduct: (state, action: PayloadAction<string>) => {
            state.typeProduct = action.payload
        },
        setDescriptionProduct: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        setMainPriceProduct: (state, action: PayloadAction<number>) => {
            state.mainPrice = action.payload
        },
        setIamgeVariants: (state, action: PayloadAction<{ [key: string]: number }>) => {
            state.imageVariants = action.payload
        },
        setVendor: (state, action: PayloadAction<string>) => {
            state.vendor = action.payload
        },
        setMinMaxPrice: (state, action: PayloadAction<{
            minPrice: number
            maxPrice: number
        }>) => {

            state.minPrice = action.payload.minPrice
            state.maxPrice = action.payload.maxPrice
        },
        setWeightProduct: (state, action: PayloadAction<{
            value: number,
            measure: string
        }>) => {

            state.weightProduct.value = action.payload.value
            state.weightProduct.measure = action.payload.measure
        },
        setQuality: (state, action: PayloadAction<number>) => {
            state.quality = action.payload
        },
        setResetProductData: (state) => {
            localStorage.removeItem("temp")
            return initialState
        },
        setProductData: (state, action: PayloadAction<iProductDetail>) => {
            let tmp = action.payload
            let d: IProductClassification[] = createClassificationFormSaveToHandle(JSON.parse(tmp.productClassification))

            var tmpEdit: { [key: string]: IProductVariant } = {}
            for (let index = 0; index < tmp.productVariants.length; index++) {
                const v = tmp.productVariants[index];
                tmpEdit[v.variantId] = {
                    image: v.position,
                    price: v.price,
                    quality: v.quality + "",
                    variantId: v.variantId,
                    variantName: v.variantName
                }
            }

            let data: iProductState = {
                description: tmp.description,
                imageurls: tmp.imageUrls.map((v) => {
                    return {
                        file: undefined,
                        url: v
                    }
                }),
                productVariantsInEdit: tmpEdit,
                imageVariants: {},
                mainPrice: tmp.mainPrice,
                maxPrice: 0,
                minPrice: 0,
                nameProduct: tmp.nameProduct,
                productClassifications: d,
                productVariants: tmp.productVariants.map(v => {
                    return {
                        image: v.position,
                        price: v.price,
                        quality: v.quality + "",
                        variantId: v.variantId,
                        variantName: v.variantName
                    }
                }),
                quality: tmp.quality,
                typeProduct: tmp.categorySlug,
                vendor: tmp.suplier,
                weightProduct: {
                    measure: "kg",
                    value: 1
                }
            }

            return data
        }
    },
})

export const {
    swapImage,
    setQuality,
    addProductClassifications,
    addProductVariants,
    setProductClassifications,
    setProductVariants,
    editOptionInProductClassifications,
    editProductClassifications,
    addOptionInProductClassifications,
    removeOptionInProductClassifications,
    removeProductClassifications,
    addImageUrlFiles,
    removeImageUrls,
    setDescriptionProduct,
    setNameProduct,
    setTypeProduct,
    setIamgeVariants,
    setMainPriceProduct,
    setVendor, setMinMaxPrice,
    setWeightProduct, setResetProductData, setProductData } = productSlice.actions

export default productSlice.reducer