export interface IProductClassification {
    name: string
    id: string
    edit: boolean
    options: {
        id: string
        name: string
        edit: boolean
    }[]
}
export interface IProductVariant {
    variantId: string
    variantName: string
    price: number
    quality: string
    image: number
}

export interface IProductVariantsDetail {
    productClassification: IProductClassification[]
    productVariants: IProductVariant[]
    mainPrice: string

}
export interface IProductVariantsDetailPros {
    productClassification: IProductClassification[]
    productVariants: IProductVariant[]
    mainPrice: string
    onChange(p: IProductVariantsDetail): void
}
export interface IPrice {
    smallPrice: number
    bigPrice: number
}

export interface IinputImage {
    files: File[]
    onChange(p: File[]): void
}