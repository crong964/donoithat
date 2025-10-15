export interface iCategoryItem {
    name: string,
    id: string,
    con: {
        name: string
        id: string
    }[]
}

export interface iCategoryBackup {
    categoryId: string
    categoryImage: string | null
    slug: string
    index: string
    nameCategory: string
    status: boolean,
    categoryParentId: string
}