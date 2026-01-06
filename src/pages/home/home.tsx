import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SLIDES } from "@/constants/home";
import "swiper/swiper.css";

export const HomePage = () => {
  const swiperRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="h-screen relative">
      <div className="container h-full flex justify-between">
        <div className="w-[60%] max-w-[70%] h-full flex flex-col gap-y-4 justify-center items-start">
          <h1 className="font-bold text-[77.67px] leading-[100%] tracking-[0%]">
            Employment Management For Foreigners
          </h1>
          <p className="font-normal text-base leading-6 tracking-[0%] text-gray-800">
            The maintenance industry, which is experiencing a shortage of
            manpower in sheet metal and painting work that requires skilled
            technology, is demanding the introduction of foreign professional
            technicians (E-7 visas), and the government…
          </p>
          <Button>Lorem more</Button>

          {/* Carousel */}
          <div className="w-full max-w-[480px] h-[240px] py-5 px-6 mb-5 bg-gradient-to-br from-neutral-300/10 to-neutral-500/10 rounded-xl border-2 border-black/5 backdrop-blur-[10px] overflow-hidden">
            {/* Custom Indicators */}
            <div className="flex gap-2 mb-4 justify-start">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className={`w-16 h-1 rounded-full transition-all ${
                    currentSlide === i ? "bg-neutral-500" : "bg-neutral-300"
                  } hover:bg-neutral-500 hover:scale-[1.03] cursor-pointer`}
                ></button>
              ))}
            </div>

            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              slidesPerView={1}
              spaceBetween={20}
              speed={500}
              loop={false} // matches infinite: false
              allowTouchMove={true}
            >
              {SLIDES.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="px-2 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{slide.title}</h3>
                    {slide.items.map((item, i) => (
                      <p key={i} className="text-sm sm:text-base text-black">
                        {item}
                      </p>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <img
        src="/images/hero-img.png"
        className="absolute top-0 z-[-1] w-full h-full object-cover"
        alt="hero"
      />
    </section>
  );
};
