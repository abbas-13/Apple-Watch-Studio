"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import {
  TSelectedCollectionData,
  TWatchProducts,
  TWatchViewTypes,
  useWatchContext,
  WatchViewTypes,
} from "../context/watchContext";
import { useIsMobile } from "../hooks/useMobile";

interface CarouselProps {
  watchView: TWatchViewTypes;
}

export const WatchCarousel = ({ watchView }: CarouselProps) => {
  const {
    selectedCollection,
    selectedCollectionData,
    setSelectedCollectionData,
    selectedFilter,
    setSelectedWatch,
    swiperRef,
    ...rest
  } = useWatchContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  const products = useMemo(
    () => {
      if (selectedFilter && rest[selectedFilter]) {
        const productsList = rest[selectedFilter][
          selectedCollection
        ].products.map((item: TWatchProducts) => ({
          frontView: item.frontView,
          sideView: item.sideView,
          case: item.watchCaseImage,
          band: item.watchBandImage,
        }));

        return productsList;
      }

      return [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFilter, selectedCollection],
  );

  const slideChange = (index: number) => {
    setActiveIndex(index);
    switch (selectedFilter) {
      case "watchSizeData":
        setSelectedCollectionData((prev) => ({
          ...(prev as TSelectedCollectionData),
          size:
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].products[index],
        }));

        setSelectedWatch((prev) => ({
          ...prev,
          size:
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].options[index].text,
        }));
        break;

      case "watchBandData":
        setSelectedCollectionData((prev) => ({
          ...(prev as TSelectedCollectionData),
          band:
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].products[index],
        }));

        setSelectedWatch((prev) => ({
          ...prev,
          band: `${
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].products[index].productName
              .split("with")[1]
              .trim()
          }`,
        }));
        break;

      case "watchCaseData":
        setSelectedCollectionData((prev) => ({
          ...(prev as TSelectedCollectionData),
          case:
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].products[index],
        }));
        setSelectedWatch((prev) => ({
          ...prev,
          case: `${
            rest[selectedFilter] &&
            rest[selectedFilter][selectedCollection].products[index].productName
              .split("with")[0]
              .split("mm")[1]
              .trim()
          }`,
        }));
        break;
    }
  };

  return (
    <div className="flex items-center h-full">
      {selectedFilter === "watchBandData" &&
      watchView !== WatchViewTypes.SIDE ? (
        <div className="absolute w-1/3 md:w-1/4 z-10 justify-self-center inset-0 flex justify-center items-center z-10">
          <img
            alt="Selected Band"
            src={selectedCollectionData?.case?.watchCaseImage || ""}
            className="z-10 w-full"
          />
        </div>
      ) : selectedFilter === "watchCaseData" &&
        watchView !== WatchViewTypes.SIDE ? (
        <div className="absolute -z-10 w-1/3 md:w-1/4 justify-self-center inset-0 flex justify-center items-center">
          <img
            alt="Selected Band"
            src={selectedCollectionData?.band?.watchBandImage || ""}
            className="-z-10 w-full"
          />
        </div>
      ) : null}
      <Swiper
        slidesPerView={isMobile ? 3 : 4}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        centeredSlides={true}
        initialSlide={2}
        spaceBetween={0}
        mousewheel
        className="mySwiper relative w-full"
        modules={[Navigation, Mousewheel]}
        navigation={{
          nextEl: ".button-next",
          prevEl: ".button-prev",
        }}
        onSlideChange={(swiper) => {
          slideChange(swiper.activeIndex);
        }}
      >
        {products?.map((item, index) => (
          <SwiperSlide key={index}>
            {index === activeIndex && watchView === WatchViewTypes.SIDE ? (
              <div
                className={`self-center${
                  watchView ? "quickTransition" : "greetingsAnimate"
                }`}
              >
                <img
                  alt="apple watch side view"
                  src={item.sideView}
                  className="-z-10 w-full"
                />
              </div>
            ) : (
              <div className="flexjustify-center">
                <img
                  alt="apple watch front view"
                  className={`w-full ${
                    watchView ? "quickTransition" : "greetingsAnimate"
                  }`}
                  src={
                    selectedFilter === "watchSizeData"
                      ? item.frontView
                      : selectedFilter === "watchBandData"
                        ? item.band
                        : selectedFilter === "watchCaseData"
                          ? item.case
                          : ""
                  }
                />
              </div>
            )}
          </SwiperSlide>
        ))}

        <button className={`button-prev ${activeIndex === 0 && "bg-black"}`}>
          <IoIosArrowBack size={25} color="#666668 " />
        </button>

        <button
          className={`button-next ${
            activeIndex === products.length - 1 && "!hidden"
          }`}
        >
          <IoIosArrowForward size={25} color="#666668 " />
        </button>
      </Swiper>
    </div>
  );
};
