"use client";

import { useState } from "react";

import GreetingWrapper from "./components/greetingWrapper";

import Header from "./components/header";
import Actions from "./components/actions";
import Products from "./components/products";
import {
  TSelectedFilter,
  TWatchViewTypes,
  useWatchContext,
  WatchViewTypes,
} from "./context/watchContext";

export default function Home() {
  const { setSelectedFilter } = useWatchContext();
  const [watchView, setWatchView] = useState<TWatchViewTypes>(null); // front view on true, side view on false
  const [isStarted, setIsStarted] = useState(false);

  const handleGetStarted = () => {
    setTimeout(() => {
      setIsStarted(true);
      setWatchView(WatchViewTypes.FRONT);
    }, 500);
  };

  const toggleExpand = (value: TSelectedFilter) => {
    setSelectedFilter(value);
  };

  const handleViewClick = () => {
    setWatchView((prev) =>
      prev === WatchViewTypes.FRONT
        ? WatchViewTypes.SIDE
        : WatchViewTypes.FRONT,
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
        <Actions isStarted={isStarted} toggleExpand={toggleExpand} />
      </div>
    </div>
  );
}
