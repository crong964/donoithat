export interface iCateGory {
  id: string;
  nameCategory: string;
  slug: string;
  categoryImage?: string;
  categoryId?: string;
}

export interface iMainCateGory extends iCateGory {
  categoryChidlren: iCateGory[];
}
