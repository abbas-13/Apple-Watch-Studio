"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  WatchContext,
  CollectionNames,
  TSelectedCollectionData,
  TSelectedFilter,
  TSelectedWatch,
} from "../context/watchContext";
import { watchBandData, watchCaseData, watchSizeData } from "../constants/data";

export const WatchContextHolder = ({ children }: { children: ReactNode }) => {
  const [selectedCollection, setSelectedCollection] = useState(
    CollectionNames.APPLE_WATCH_SERIES_10
  );
  const [selectedCollectionData, setSelectedCollectionData] =
    useState<TSelectedCollectionData | null>({
      size: watchSizeData[selectedCollection].products[1],
      case: watchCaseData[selectedCollection].products[0],
      band: watchBandData[selectedCollection].products[36],
    });
  const [selectedFilter, setSelectedFilter] = useState<TSelectedFilter>(null);
  const [selectedWatch, setSelectedWatch] = useState<TSelectedWatch>({
    size: "46mm",
    case: "Jet Black Aluminum Case",
    band: "Black Solo Loop",
    pdpName: "",
    price: "",
  });
  const [selectedOption, setSelectedOption] = useState({
    size: "46mm",
    case: "Titanium",
    band: "Solo Loop",
  });

  useEffect(() => {
    setSelectedCollectionData({
      size: watchSizeData[selectedCollection].products[1],
      case: watchCaseData[selectedCollection].products[2]
        ? watchCaseData[selectedCollection].products[2]
        : watchCaseData[selectedCollection].products[0],
      band:
        watchBandData[selectedCollection].products[36] ||
        watchBandData[selectedCollection].products[8],
    });
    setSelectedWatch({
      size: watchSizeData[selectedCollection].options[1].text,
      case: watchCaseData[selectedCollection].products[2]
        ? watchCaseData[selectedCollection].products[2].productName
            .split("with")[0]
            .split("mm")[1]
            .trim()
        : watchCaseData[selectedCollection].products[0].productName
            .split("with")[0]
            .split("mm")[1]
            .trim(),
      band: watchBandData[selectedCollection].products[36]
        ? watchBandData[selectedCollection].products[36].productName
            .split("with")[1]
            .trim()
        : watchBandData[selectedCollection].products[8].productName
            .split("with")[1]
            .trim(),
      pdpName: "",
      price: "",
    });
  }, [selectedCollection]);

  return (
    <WatchContext.Provider
      value={{
        selectedCollection,
        setSelectedCollection,
        selectedCollectionData,
        setSelectedCollectionData,
        watchSizeData,
        watchBandData,
        watchCaseData,
        selectedFilter,
        setSelectedFilter,
        selectedWatch,
        setSelectedWatch,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};
