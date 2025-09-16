import ProductSlug from "@/components/client/product/product-slug"
import { getProductBySlug } from "@/service/product-service"


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