import { iImportProduct } from "../inventory/interface";

export interface iImportGetAdmin {
  importId: string;
  receivedDate: string;
  totalMoney: number;
  purchaseInvoiceId: string;
  suplierId: string;
  suplierName: string;
}

export interface igetImportAdminByIdRes {
  import: {
    userId: string;
    fullName: string;
    importId: string;
    purchaseInvoiceId: string;
    totalMoney: number;
    receivedDate: string;
    suplierId: string;
    suplierName: string;
  };
  ls: {
    image: string;
    quality: number;
    productVariantName: string;
    productVariantId: string;
    importPrice: number;
  }[];
}
