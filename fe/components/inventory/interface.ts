export interface iInventoryGet {
    brandId: string;
    onSale: string;
    inventoryName: string;
    curPage: number;

}

export interface iInventory {
    productVariantId: string
    brandName: string
    productVariantName: string
    price: number,
    onSale: string,
    importPrice: number;
    image: string
    quality: number;
    position: string
    weight: string

}