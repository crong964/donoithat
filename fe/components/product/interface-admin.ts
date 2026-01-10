import { iProductVariant } from "../variant/interface";

export interface iProduct {
  productId: string;
  slug: string;
  mainPrice: number;
  nameProduct: string;
  quality: string;
  suplier: string;
  imageUrls: string[];
  status: number;
  categoryName: string;
  categorySlug: string;
  productVariants: iProductVariant[];
}
export interface iGetProduct {
  products: iProduct[];
  totalPage: number;
  page: number;
  totalItem: number;
  nameCate: string;
}

export interface iProductDetail {
  productId?: string;
  slug: string;
  description: string;
  productClassification: string;
  mainPrice: number;
  nameProduct: string;
  quality: number;
  suplier: string;
  productVariants: iProductVariant[];
  imageUrls: string[];
  categorySlug: string;
  nameCategory: string;
  brandId: string;
}

export interface iVariants {}

export interface iProductVariantCart {
  productVariantId: string;
  productId: string;
  productVariantName: string;
  variantName: string;
  price: number;
  image: string;
  quality: number;
}
