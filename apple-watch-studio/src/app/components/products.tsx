import Image from "next/image";

import { TWatchViewTypes, WatchViewTypes } from "../page";
import sideView from "../../../public/appleWatchSideView.png";
import dial from "../../../public/appleWatchDial.png";
import band from "../../../public/appleWatchBand.png";
import { useWatchContext } from "../context/watchContext";
import { WatchCarousel } from "./watchCarousel";

interface ProductsProps {
  isStarted: boolean;
  watchView: TWatchViewTypes;
  handleViewClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Products = ({ isStarted, watchView, handleViewClick }: ProductsProps) => {
  const { selectedCollectionData, selectedFilter } = useWatchContext();

  return (
    <div className="grid grid-rows-[80%_20%] block">
      <div className=" flex justify-center duration-1000 ease-in-out transform w-full">
        <div
          className={`items-center transition-all flex justify-center ease-in-out transform ${
            isStarted
              ? "scale-[0.52] duration-1000"
              : "translate-y-64 scale-100"
          } ${!selectedFilter ? "opacity-100" : "opacity-0 hidden"}`}
        >
          {watchView === WatchViewTypes.SIDE ? (
            <div
              className={`${
                watchView ? "quickTransition" : "greetingsAnimate"
              }`}
            >
              <Image width={800} alt="apple watch side view" src={sideView} />
            </div>
          ) : (
            <>
              <Image
                width={800}
                className={`absolute ${
                  watchView ? "quickTransition" : "greetingsAnimate"
                }`}
                alt="apple watch dial"
                src={dial}
              />
              <Image
                width={800}
                className={`-z-10 ${
                  watchView ? "quickTransition" : "greetingsAnimate"
                }`}
                alt="apple watch band"
                src={band}
              />
            </>
          )}
        </div>

        <div
          className={`w-screen overflow-x-scroll ${
            selectedFilter ? "opacity-100 h-content" : "opacity-0 hidden"
          }`}
        >
          <WatchCarousel />
        </div>
      </div>

      <div
        className={`flex flex-col gap-[4px] text-[14px] items-center ${
          isStarted ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000 delay-1000 ease-linear`}
      >
        <button
          className="font-sf cursor-pointer mb-[8px] text-[12px] underline text-[#06c]"
          onClick={handleViewClick}
        >
          {watchView === null || undefined
            ? "Front View"
            : watchView === WatchViewTypes.FRONT
            ? "Side view"
            : watchView === WatchViewTypes.SIDE
            ? "Front view"
            : "Front view"}
        </button>
        <span className="font-sf font-semibold text-[12px] text-[#6e6e73]">
          {selectedCollectionData?.size.products.collectionName}
        </span>
        <span className="font-sf font-semibold text-[14px] text-[#1d1d1f]">
          {selectedCollectionData?.size.products.productName}
        </span>
        {/* used dangerouslySetInnerHTML because that is how we receive the data from the back end */}
        <span
          className="font-sf text-[14px]"
          dangerouslySetInnerHTML={{
            __html: selectedCollectionData?.size.products.fromPrice || "",
          }}
        />
      </div>
    </div>
  );
};

export default Products;
