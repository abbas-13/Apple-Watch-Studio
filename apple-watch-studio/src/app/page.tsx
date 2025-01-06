"use client";

import { useState } from "react";

import GreetingWrapper from "./components/greetingWrapper";

import Header from "./components/header";
import Actions from "./components/actions";
import Products from "./components/products";
import { useWatchContext } from "./context/watchContext";
import { CollectionNames } from "./context/watchContext";
import { WatchCarousel } from "./components/watchCarousel";

export enum WatchViewTypes {
  FRONT = "FRONT",
  SIDE = "SIDE",
}

export type TWatchViewTypes = WatchViewTypes | null;

export default function Home() {
  const { selectedCollection, selectedFilter, setSelectedFilter } =
    useWatchContext();
  const [watchView, setWatchView] = useState<TWatchViewTypes>(null); // front view on true, side view on false
  const [isStarted, setIsStarted] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState({
    size: "",
    case: "",
    band: "",
  });

  const handleGetStarted = () => {
    setTimeout(() => {
      setIsStarted(true);
      setWatchView(WatchViewTypes.FRONT);
    }, 500);
  };

  const toggleExpand = (value: string) => {
    setSelectedFilter(value);
  };

  const handleOptionClick = (selectedOption: object) => {
    const [[key, value]] = Object.entries(selectedOption);
    setSelectedWatch((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleViewClick = () => {
    setWatchView((prev) =>
      prev === WatchViewTypes.FRONT ? WatchViewTypes.SIDE : WatchViewTypes.FRONT
    );
  };

  return (
    <div className="h-full ">
      <Header isStarted={isStarted} />
      <div
        className={`h-[calc(100vh-72px)] grid greetingsAnimate ${
          isStarted ? "grid-rows-[80%_15%]" : "grid-rows-[50%_50%]"
        }`}
      >
        <GreetingWrapper
          handleGetStarted={handleGetStarted}
          isStarted={isStarted}
        />
        <Products
          isStarted={isStarted}
          handleViewClick={handleViewClick}
          watchView={watchView}
        />
        <Actions
          isStarted={isStarted}
          toggleExpand={toggleExpand}
          handleOptionClick={handleOptionClick}
          watchView={watchView}
        />
      </div>
    </div>
  );
}
