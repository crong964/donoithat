interface iCateGory {
    id: string
    nameCategory: string,
    slug:string,
    
}

export interface iMainCateGory extends iCateGory {
    categoryChidlren: iCateGory[]
}