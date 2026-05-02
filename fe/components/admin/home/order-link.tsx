"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderLink(p: { ls: string[] }) {
  const pathname = useSearchParams().get("type");
  const status = p.ls;
  return (
    <div className="my-3.75 overflow-x-auto px-2">
      <ul className="bg-a rounded-2xl flex ">
        <Link className="flex-1" href={`/admin/order`}>
          <p
            data-path={pathname == undefined}
            className="text-sm data-[path=true]:border-b-f data-[path=false]:border-b-white border-b-4 text-center py-4 hover:text-f font-normal"
          >
            Tất cả đơn hàng
          </p>
        </Link>
        {status.map((v, i) => {
          return (
            <li className="flex-1 bg-a ">
              <Link key={v} className="" href={`/admin/order?type=${i}`}>
                <p
                  data-path={pathname == i + ""}
                  className="text-sm  data-[path=true]:border-b-f data-[path=false]:border-b-white border-b-4 text-center py-4 hover:text-f font-normal"
                >
                  {v}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
