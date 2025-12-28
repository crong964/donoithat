import Link from "next/link";
export interface iNavi {
  name: string;
  url: string;
}
export default function Navi(p: { ls: iNavi[] }) {
  return (
    <div className="px-3.75">
      <div>
        <ol className=" flex py-2.25 text-[13px] leading-4.75">
          <li>
            <Link className="" href="/">
              Trang chủ
            </Link>
          </li>
          {p.ls.map((v, i) => {
            return (
              <li key={v.url + i}>
                <Link className="" href={v.url}>
                  <span className="px-0.75 text-[#ccc] ml-1.25">/</span>{" "}
                  {v.name}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
