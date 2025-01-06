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

interface TWatchProducts {
  collectionName: string;
  fromPrice: string;
  frontView: string;
  sideView: string;
  productName: string;
  watchBandImage: string;
  watchCaseImage: string;
}

export interface TSelectedCollectionData {
  size: { products: Partial<TWatchProducts>; options: TWatchOptions[] };
  case: { products: Partial<TWatchProducts>; options: TWatchOptions[] };
  band: { products: Partial<TWatchProducts>; options: TWatchOptions[] };
}

type TWatchFilterData = {
  products: TWatchProducts[];
  options: TWatchOptions[];
};

interface TSizeFilterData extends TWatchFilterData {
  studioSwitchers: TStudioSwitchers[];
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
  selectedFilter: "watchSizeData" | "watchCaseData" | "watchBandData" | null;
  setSelectedFilter: Dispatch<SetStateAction<string | null>>;
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
});

export const useWatchContext = () => useContext(WatchContext);
