export interface iAddressComboBox {
    addresses: iAddress[],
    onChang(p: iAddress): void
}
export interface iAddress {
    addressId: string
    lat: number
    lng: number
    title: string
    address: string
}