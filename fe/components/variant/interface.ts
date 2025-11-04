// Mô tả đúng theo shape hiện tại (productClassification là chuỗi JSON)
export interface iProductVariant {
    productId: any;
    productVariantId: string;
    variantId: string;          // ví dụ: "1756787077610 1756787077610 1756787077610"
    variantName: string;        // ví dụ: "Tự nhiên Gỗ cao su/plywood D50.5xW49.5xH80"
    price: number;              // 79900000
    image: string;              // URL
    position: number;           // 4
    quality: number;            // 6
    weight: number;             // 0
    importPrice: number;
}

export interface iProductVariantSearch {
    productVariantId: string;
    image: string;
    productVariantName: string;
    price: number;
    importPrice: number,
    quality: number;
}


export interface iProductVariantById {
    productVariantId: string;
    productVariantName: string
    price: number;
    image: string;
    brandId: string
    quality: number;
    weight: number;
    importPrice: number;
}