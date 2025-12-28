import menudata from "@/tempdata/menufooter";
import { Menu } from "antd";
import { MenuItem } from "@/components/ui/menu";
import { Fragment } from "react";

export default function Footer() {
  return (
    <footer className=" bg-white min-h-100">
      <div className="max-w-350 mx-auto">
        <div className="py-5">
          <div className="px-3.75">
            <div className="py-2.5 flex items-center justify-between">
              <div className="max-lg:flex-1">
                <div className="flex items-center max-lg:space-y-3 max-lg:flex-col">
                  <h1 className="lg:pr-5 text-[16px] lg:text-[20px] leading-4.75 lg:leading-6 font-bold">
                    Đăng ký nhận tin
                  </h1>
                  <div className="flex-1  w-full">
                    <div className=" flex justify-between lg:justify-center items-center rounded-2xl max-lg:border border-boder">
                      <div className="flex-1 lg:border-[1.6px]  text-[13px] leading-5 relative rounded-3xl font-medium lg:w-72.5 rounded-2xl border-boder pl-10 py-2.25 pr-5">
                        <span className="absolute top-1/2 -translate-y-1/2 left-2.5  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          placeholder="nhập email của bạn"
                          className="focus:outline-none flex-1"
                        />
                      </div>
                      <button className="max-lg:h-10 uppercase max-lg:tracking-letter lg:ml-5 px-5 lg:px-8.75 lg:py-2.25 bg-f rounded-3xl max-lg:text-[12px] font-bold text-white">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center max-lg:hidden">
                <div className="pr-5">
                  <h3 className="text-[20px] leading-6 font-bold">
                    Kết nối với chúng tôi
                  </h3>
                </div>
                <div>
                  <ul className="flex">
                    <li className="w-8 h-8  border border-black text-center rounded-full">
                      <a href="#" className=" text-[14px]  leading-7.5 ">
                        <i className="ri-facebook-fill"></i>
                      </a>
                    </li>
                    <li className="w-8 h-8 border ml-2 border-black text-center rounded-full">
                      <a href="#" className=" text-[14px]  leading-7.5 ">
                        <i className="ri-youtube-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-7.5">
          <div className="max-lg:px-3.75">
            <div className="flex max-lg:flex-col">
              <div className="flex-1  lg:basis-1/4  grow-0 shrink-0 basis lg:px-3.75">
                <h4 className="pb-6.75 max-lg:hidden"></h4>
                <ul className="text-[14px] leading-5.5 font-normal">
                  <li>
                    <p>
                      CÔNG TY CỔ PHẦN NỘI THẤT BAYA - Văn phòng 02, Tầng 08, Tòa
                      nhà Pearl Plaza, Số 561A Điện Biên Phủ, Phường 25, Quận
                      Bình Thạnh, Tp. Hồ Chí Minh, Việt Nam - MST: 0317230965
                    </p>
                  </li>
                  <li className="mb-2">
                    <span className="float-left h-4 pr-2">
                      <i className="ri-map-pin-2-fill"></i>
                    </span>
                    <p>
                      BAYA Hà Nội: Toà nhà Luxury Park Views, D32 KĐT mới Cầu
                      Giấy, đường Trương Công Giai, Yên Hoà, Cầu Giấy. Thời gian
                      hoạt động: 9h00 - 21h00 (kể cả CN và ngày lễ)
                    </p>
                  </li>
                  <li className="mb-2">
                    <span className="float-left h-4 pr-2">
                      <i className="text-[18px] ri-phone-fill"></i>
                    </span>
                    <p>1900 63 64 76</p>
                  </li>
                  <li className="mb-2">
                    <span className="float-left h-4 pr-2">
                      <i className="text-[18px] ri-mail-fill"></i>
                    </span>
                    <p>webshop@baya.vn</p>
                  </li>
                </ul>
                <div>
                  <a href="#">
                    <img src="/footer_logobct_img.png" alt="" srcSet="" />
                  </a>
                </div>
              </div>
              {/* <span className='sm:'>
                                <MenuF></MenuF>
                            </span> */}
              <MenuF2></MenuF2>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3.75 bg-a text-[13px] font-normal text-center leading-5.25">
        <p>Copyright © 2025 Baya. Powered by Cronge</p>
      </div>
    </footer>
  );
}

function MenuF() {
  const items: MenuItem[][] = menudata.map((v, i) => {
    return [
      {
        className:
          "flex-1 lg:basis-1/4   grow-0 shrink-0 leading-5.5 lg:px-3.75",
        label: (
          <div className="font-bold text-[18px] leading-5.5 text-black">
            {v.title}
          </div>
        ),
        key: i,
        children: v.children.map((vc, ic) => {
          return {
            label: (
              <li className="hover:text-f mb-2 px-0">
                <a href="#"> {vc}</a>
              </li>
            ),
            key: ic,
          };
        }),
      },
    ];
  });

  return items.map((v, i) => {
    return (
      <Menu
        mode="inline"
        items={v}
        key={i}
        inlineIndent={0}
        forceSubMenuRender={false}
      />
    );
  });
}

function MenuF2() {
  const items: MenuItem[][] = menudata.map((v, i) => {
    return [
      {
        className:
          "flex-1 lg:basis-1/4   grow-0 shrink-0 leading-5.5 lg:px-3.75",
        label: (
          <div className="font-bold text-[18px] leading-5.5 text-black">
            {v.title}
          </div>
        ),
        key: i,
        children: v.children.map((vc, ic) => {
          return {
            label: (
              <li className="hover:text-f mb-2 px-0">
                <a href="#"> {vc}</a>
              </li>
            ),
            key: ic,
          };
        }),
      },
    ];
  });

  return (
    <Fragment>
      {menudata.map((v) => {
        return (
          <ol
            key={v.title}
            className="flex-1 lg:basis-1/4   grow-0 shrink-0 leading-5.5 lg:px-3.75"
          >
            <h2 className="font-bold pt-3.75 pb-4 text-[18px] leading-5.5 text-black">
              {v.title}
            </h2>
            {v.children.map((vc, i) => {
              return (
                <li key={vc + i} className="hover:text-f  mb-2 px-0">
                  <a className="text-[14px] font-normal" href="#">
                    {" "}
                    {vc}
                  </a>
                </li>
              );
            })}
          </ol>
        );
      })}
    </Fragment>
  );
}
