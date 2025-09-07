import ProductSlug from "@/components/client/product/productSlug"
import { getProductBySlug } from "@/service/productService"


export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const product = await getProductBySlug(slug);
    if (product == null) {
        return <></>
    }


    return (
        <ProductSlug  {...product} />
    )
}