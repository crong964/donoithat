interface CateGory {
    id: string
    nameCategory: string,
    slug:string,
    
}

interface MainCateGory extends CateGory {
    categoryChidlren: CateGory[]
}