import { iProductVariant } from "../variant/interface"

export interface iProduct {
    slug: string
    mainPrice: number,
    nameProduct: string,
    quality: string,
    imageUrl: string,
    suplier: string
    imageUrls: string[]
}
export interface iGetProduct {
    productModels: iProduct[],
    totalPage: number,
    page: number
    totalItem: number,
    nameCate: string
}


export interface iProductDetail {
    productDetail: {
        slug: string;
        description: string;
        productClassification: string;
        mainPrice: number;
        nameProduct: string;
        quality: number;
        suplier: string;
        productVariantModels: iProductVariant[];
        imageEntities: string[];
        categotyProductDetail: {
            slug: string,
            nameCategory: string
        },
    }
    relatedProducts: iProduct[]
}

export interface iVariants {

}

export interface iProductVariantCart {
    productVariantId: string
    productId: string
    productVariantName: string
    variantName: string
    price: number
    image: string
    quality: number
}