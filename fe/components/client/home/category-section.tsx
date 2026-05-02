import { MainCarousel } from "@/components/ui/carousel";

const CategorySection = () => {
  return (
    <section className="mt-7.5 pb-17.5 px-3.75">
      <MainCarousel>
        {Array.from({ length: 4 }).map((v, i) => {
          return (
            <div
              key={i}
              className="group basis-9/13 lg:basis-1/4  grow-0  shrink-0 px-2 h-max cursor-pointer relative "
            >
              <div className=" overflow-hidden h-50 rounded-sm">
                <img
                  src={`/categorybanner_${i + 1}_img.jpg`}
                  className="w-full h-full object-cover transform  group-hover:scale-110 duration-500 "
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="w-full pointer-events-none  z-0 absolute bottom-0   left-0 px-5 py-2.5">
                <div className="text-center text-[18px] leading-5  font-bold text-f">
                  Phòng khách
                </div>
                <div className="text-center">xem ngay</div>
              </div>
            </div>
          );
        })}
      </MainCarousel>
    </section>
  );
};

export default CategorySection;
