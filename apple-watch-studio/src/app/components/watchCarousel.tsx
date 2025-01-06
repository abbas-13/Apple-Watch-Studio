"use client";

import Image from "next/image";
import { useWatchContext } from "../context/watchContext";
import "react-multi-carousel/lib/styles.css";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const WatchCarousel = () => {
  const {
    selectedCollection,
    selectedCollectionData,
    selectedFilter,
    ...rest
  } = useWatchContext();
  const [activeIndex, setActiveIndex] = useState(0);

  const products = useMemo(
    () => {
      if (selectedFilter && rest[selectedFilter]) {
        const productsList = rest[selectedFilter][
          selectedCollection
        ].products.map((item: object) => ({
          frontView: item.frontView,
          sideView: item.sideView,
        }));

        return productsList;
      }

      return [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFilter]
  );

  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      initialSlide={3}
      spaceBetween={0}
      mousewheel
      className="mySwiper relative"
      modules={[Navigation, Mousewheel]}
      navigation={{
        nextEl: ".button-next",
        prevEl: ".button-prev",
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {products?.map((item, index) => (
        <SwiperSlide key={index}>
          <Image
            alt="apple watch"
            height={416}
            width={416}
            src={item.frontView}
            key={item.frontView}
          />
        </SwiperSlide>
      ))}

      <button className="button-prev top-[20px]">
        <IoIosArrowBack size={25} color="#666668 " />
      </button>
      <button className="button-next">
        <IoIosArrowForward size={25} color="#666668 " />
      </button>
    </Swiper>
  );
};
