import AddProduct from "@/components/route/admin/product/add-product";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AddPage() {
  return (
    <>
      <div className="ml-3 mt-3">
        <Link href={"/admin/product"}>
          <Button variant={"blue"}>Trở về</Button>
        </Link>
      </div>
      <main className="flex justify-center">
        <section>
          <AddProduct />
        </section>
      </main>
    </>
  );
}
