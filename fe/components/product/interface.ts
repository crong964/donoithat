import { Variants } from "antd/es/config-provider";

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
    productModels?: iProduct[],
    totalPage: number,
    page: number
    totalItem: number,
    nameCate: string
}
// Mô tả đúng theo shape hiện tại (productClassification là chuỗi JSON)
export interface ProductVariant {
    productVariantId: string;
    variantId: string;          // ví dụ: "1756787077610 1756787077610 1756787077610"
    variantName: string;        // ví dụ: "Tự nhiên Gỗ cao su/plywood D50.5xW49.5xH80"
    price: number;              // 79900000
    image: string;              // URL
    position: number;           // 4
    quality: number;            // 6
    weight: number;             // 0
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
        productVariantModels: ProductVariant[];
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