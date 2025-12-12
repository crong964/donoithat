export interface iAddressComboBox {
  addresses: iAddress[];
  onChange(p: { id: string; address: string }): void;
}
export interface iAddress {
  addressId: string;
  lat: number;
  lng: number;
  title: string;
  address: string;
}

export interface iLatLng {
  lat: number;
  lng: number;
}
