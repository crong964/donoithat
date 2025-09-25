import { iProductVariant } from "../product/interface"

export interface iOrder {
    orderId: string
    orderTime: string
    lat: string
    lng: string
    note: string
    address: string
    status: string
    pay: string
}
export interface iOrderInAdmin {
    orderId: string
    orderTime: string
    lat: string
    lng: string
    note: string
    address: string
    status: string
    pay: string,
    userAccount: string
    userName: string
}
export interface iProductVariantDetail {
    productId: any;
    productVariantId: string;
    variantId: string;          // ví dụ: "1756787077610 1756787077610 1756787077610"
    variantName: string;        // ví dụ: "Tự nhiên Gỗ cao su/plywood D50.5xW49.5xH80"
    price: number;              // 79900000
    image: string;              // URL
    productName: string
    quality: number;            // 6
    weight: number;             // 0
}
export interface iOrderDetail {
    orderDetails: iProductVariantDetail[],
    order: iOrder
}