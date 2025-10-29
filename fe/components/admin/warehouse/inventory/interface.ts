export interface iInventoryGet {
    brandId: string;
    independent: boolean;
    productVariantName: string;
    curPage: number;

}

export interface iInventory {
    productVariantId: string
    brandName: string
    productVariantName: string
    price: number,
    show: string,
    importPrice: number;
    image: string
    quality: number;
    position: string
    weight: string

}