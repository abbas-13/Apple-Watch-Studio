import { createContext, Dispatch, SetStateAction, useContext } from "react";

export enum CollectionNames {
  APPLE_WATCH_SERIES_10 = "Apple Watch Series 10",
  APPLE_WATCH_HERMÈS_SERIES_10 = "Apple Watch Hermès Series 10",
  APPLE_WATCH_SE = "Apple Watch SE",
}

interface TStudioSwitchers {
  dimensionCollection: string;
  dimensionCollectionKey: string;
  linkText: string;
  selected: boolean;
}

interface TWatchOptions {
  sortOrder: number;
  text: string;
  value: string;
}

interface TDimension {
  watch_cases_dimensionCaseMaterial: string;
  watch_bands_dimensionMaterial: string;
}

interface TWatchProducts {
  collectionName: string;
  fromPrice: string;
  frontView: string;
  sideView: string;
  productName: string;
  watchBandImage: string;
  watchCaseImage: string;
  pdpProductName: string;
  dimension: TDimension;
}

export interface TSelectedCollectionData {
  size: Partial<TWatchProducts>;
  case: Partial<TWatchProducts>;
  band: Partial<TWatchProducts>;
}

type TWatchFilterData = {
  products: TWatchProducts[];
  options: TWatchOptions[];
};

interface TSizeFilterData extends TWatchFilterData {
  studioSwitchers: TStudioSwitchers[];
}

export interface TSelectedWatch {
  size: string | null;
  case: string | null;
  band: string | null;
  pdpName: string | null;
  price: string;
}

export type TSelectedFilter =
  | "watchSizeData"
  | "watchCaseData"
  | "watchBandData"
  | null;

export interface TSelectedOption {
  size: string;
  case: string;
  band: string;
}

export interface TWatchContext {
  selectedCollection: CollectionNames;
  setSelectedCollection: Dispatch<SetStateAction<CollectionNames>>;
  selectedCollectionData: TSelectedCollectionData | null;
  setSelectedCollectionData: Dispatch<
    SetStateAction<TSelectedCollectionData | null>
  >;
  watchSizeData:
    | {
        [key in CollectionNames]: TSizeFilterData;
      }
    | null;
  watchCaseData:
    | {
        [key in CollectionNames]: TWatchFilterData;
      }
    | null;
  watchBandData:
    | {
        [key in CollectionNames]: TWatchFilterData;
      }
    | null;
  selectedFilter: TSelectedFilter;
  setSelectedFilter: Dispatch<
    SetStateAction<"watchSizeData" | "watchCaseData" | "watchBandData" | null>
  >;
  selectedWatch: TSelectedWatch | null;
  setSelectedWatch: Dispatch<SetStateAction<TSelectedWatch>>;
  selectedOption: TSelectedOption | null;
  setSelectedOption: Dispatch<SetStateAction<TSelectedOption>>;
}

export const WatchContext = createContext<TWatchContext>({
  selectedCollection: CollectionNames.APPLE_WATCH_SERIES_10,
  setSelectedCollection: () => {},
  selectedCollectionData: null,
  setSelectedCollectionData: () => {},
  watchSizeData: null,
  watchCaseData: null,
  watchBandData: null,
  selectedFilter: null,
  setSelectedFilter: () => {},
  selectedWatch: null,
  setSelectedWatch: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
});

export const useWatchContext = () => useContext(WatchContext);
