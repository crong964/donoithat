const Test = () => {
  return (
    <div className="w-full mt-10 max-sm:px-5">
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <>
            <div className="flex max-sm:flex-col relative max-sm:border-l-1 max-sm:border-f  max-sm:pl-10 max-sm:pb-5">
              <div className="basis-1/2 min-h-40   sm:pr-10 sm:pb-5 sm:flex justify-end sm:text-right">
                <div className="w-full sm:max-w-110">
                  <h2 className="text-[28px] font-bold">2005</h2>
                  <h3 className="text-[20px] text-f font-bold"> Khởi đầu </h3>
                  <p className="text-lg font-medium">
                    Thành lập Công ty TNHH Thiết bị và Công nghệ Y tế Việt Nam
                    (Vietmed) tại Hà Nội. Bắt đầu phân phối thiết bị chẩn đoán
                    hình ảnh và xét nghiệm cho các bệnh viện lớn tại miền Bắc.
                  </p>
                </div>
              </div>
              <div className="flex-1 sm:flex justify-start sm:relative sm:border-l-1 sm:border-f sm:pl-10 sm:pb-5">
                <div className="h-3 w-3 rounded-full bg-f absolute top-0 left-0 -translate-x-1/2"></div>
                <div className="w-full sm:max-w-110">
                  <img
                    src="https://cdn.hstatic.net/files/200001042017/file/history-1.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex max-sm:flex-col-reverse relative max-sm:border-l-1 max-sm:border-f  max-sm:pl-10 max-sm:pb-5">
              <div className="basis-1/2 min-h-40  sm:pr-10 sm:pb-5 sm:flex justify-end text-right">
                <div className="w-full sm:max-w-110">
                  <img
                    src="https://cdn.hstatic.net/files/200001042017/file/history-1.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1 sm:flex justify-start sm:pl-10 sm:relative sm:border-l-1 sm:border-f sm:pb-5">
                <div className="h-3 w-3 rounded-full bg-f absolute top-0 left-0 -translate-x-1/2"></div>
                <div className="w-full sm:max-w-110">
                  <h2 className="text-[28px] font-bold">2005</h2>
                  <h3 className="text-[20px] text-f font-bold"> Khởi đầu </h3>
                  <p className="text-lg font-medium">
                    Thành lập Công ty TNHH Thiết bị và Công nghệ Y tế Việt Nam
                    (Vietmed) tại Hà Nội. Bắt đầu phân phối thiết bị chẩn đoán
                    hình ảnh và xét nghiệm cho các bệnh viện lớn tại miền Bắc.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Test;
