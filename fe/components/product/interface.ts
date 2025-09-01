export interface iProduct {
    productId: string
    mainPrice: number,
    nameProduct: string,
    quality: string,
    imageUrl: string

}
export interface iGetProduct {
    productModels?: iProduct[],
    totalPage: number,
    page: number
}