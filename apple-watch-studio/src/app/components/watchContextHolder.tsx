"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  WatchContext,
  CollectionNames,
  TSelectedCollectionData,
} from "../context/watchContext";
import { watchBandData, watchCaseData, watchSizeData } from "../constants/data";

export const WatchContextHolder = ({ children }: { children: ReactNode }) => {
  const [selectedCollection, setSelectedCollection] = useState(
    CollectionNames.APPLE_WATCH_SERIES_10
  );
  const [selectedCollectionData, setSelectedCollectionData] =
    useState<TSelectedCollectionData | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    setSelectedCollectionData({
      size: {
        products: watchSizeData[selectedCollection].products[1],
        options: watchSizeData[selectedCollection].options,
      },
      case: {
        products: watchCaseData[selectedCollection].products[1],
        options: watchCaseData[selectedCollection].options,
      },
      band: {
        products: watchBandData[selectedCollection].products[1],
        options: watchBandData[selectedCollection].options,
      },
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
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};
