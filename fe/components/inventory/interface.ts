export interface iInventoryGet {
  brandId: string;
  onSale: string;
  inventoryName: string;
  curPage: number;
}

export interface iInventory {
  productVariantId: string;
  brandName: string;
  productVariantName: string;
  price: number;
  onSale: string;
  importPrice: number;
  image: string;
  quality: number;
  position: string;
  weight: string;
}

export interface iImportProduct {
  imagePath: string;
  quality: number;
  productVariantName: string;
  productVariantId: string;
  importPrice: number;
}

export interface iInventoryOrderAdmin {
  inventoryId: string;
  imagePath: string;
  suplierId: string;
  suplierName: string;
  suplierPhoneNumber: string;
  productVariantName: string;
  receiedQuality: string;
}

export interface iBackupInventory {
  productVariantId: string;
  productVariantName: string;
  variantId: string;
  variantName: string;
  price: string;
  importPrice: string;
  image: string;
  quality: string;
  position: string;
  weight: string;
  brandId: string;
  productId: string;
  imageFiles: string;
}
