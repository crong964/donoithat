interface CateGory {
    id: string
    name: string
}

interface MainCateGory extends CateGory {
    subCa: CateGory[]
}