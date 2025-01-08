import Image from "next/image";

import buttonBand from "../../../public/watchBand.svg";
import buttonCase from "../../../public/watchCase.svg";
import buttonSize from "../../../public/watchSize.svg";
import { TWatchViewTypes } from "../page";
import { TSelectedFilter, useWatchContext } from "../context/watchContext";

interface ActionsProps {
  toggleExpand: (value: TSelectedFilter) => void;
  isStarted: boolean;
  watchView: TWatchViewTypes;
}

const Actions = ({ toggleExpand, isStarted }: ActionsProps) => {
  const {
    selectedCollection,
    selectedFilter,
    selectedWatch,
    setSelectedOption,
    selectedCollectionData,
    ...rest
  } = useWatchContext();

  const handleOptionClick = (selectedOption: object) => {
    const [[key, value]] = Object.entries(selectedOption);
    setSelectedOption((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log(selectedCollectionData);

  return (
    <div
      className={`flex gap-3 justify-center items-center ${
        isStarted ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 delay-1000 ease-linear`}
    >
      <button
        onClick={() => toggleExpand("watchSizeData")}
        className="flex items-center gap-2 font-sf bg-[#e8e8ed] leading-[-.022em] px-[22px] duration-250 transform ease-in text-[17px] rounded-full p-[10px]"
      >
        {selectedFilter === "watchSizeData" ? (
          <div className="flex gap-3">
            <Image src={buttonSize} alt="watch size button logo" />
            {rest[selectedFilter][selectedCollection].options.map((item) => (
              <span
                key={item.value}
                onClick={() => handleOptionClick({ size: item.text })}
                className={`cursor-pointer ${
                  selectedWatch.size === item.text ? "font-semibold" : ""
                } `}
              >
                {item.text}
              </span>
            ))}
          </div>
        ) : (
          <>
            <Image src={buttonSize} alt="watch size button logo" />
            Size
          </>
        )}
      </button>
      <button
        onClick={() => toggleExpand("watchCaseData")}
        className="flex items-center gap-2 font-sf bg-[#e8e8ed] leading-[-.022em] transition-all duration-250 transform ease-in text-[17px] rounded-full p-[10px] px-[22px]"
      >
        {selectedFilter === "watchCaseData" ? (
          <div className="flex gap-3">
            <Image src={buttonCase} alt="watch case button logo" />
            {rest[selectedFilter][selectedCollection].options.map((item) => (
              <span
                key={item.value}
                onClick={() => handleOptionClick({ case: item.text })}
                className={`cursor-pointer ${
                  selectedCollectionData?.case.dimension
                    .watch_cases_dimensionCaseMaterial === item.value
                    ? "font-semibold"
                    : ""
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        ) : (
          <>
            <Image src={buttonCase} alt="watch case button logo" />
            Case
          </>
        )}
      </button>
      <button
        onClick={() => toggleExpand("watchBandData")}
        className="flex items-center gap-2 font-sf bg-[#e8e8ed] leading-[-.022em] transition-all duration-500 transform ease-in text-[17px] rounded-full p-[10px] px-[22px]"
      >
        {selectedFilter === "watchBandData" ? (
          <div className="flex gap-3">
            <Image src={buttonBand} alt="watch band button logo" />
            {rest[selectedFilter][selectedCollection].options.map((item) => (
              <span
                key={item.value}
                onClick={() => handleOptionClick({ band: item.text })}
                className={`cursor-pointer ${
                  selectedCollectionData?.band.dimension
                    .watch_bands_dimensionMaterial === item.value
                    ? "font-semibold"
                    : ""
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        ) : (
          <>
            <Image src={buttonBand} alt="watch band button logo" />
            Band
          </>
        )}
      </button>
    </div>
  );
};

export default Actions;
