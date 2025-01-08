import Image from "next/image";

import { CollectionsList } from "./collectionsList";
import logo from "../../../public/appleWatchLogo.svg";
import expandIcon from "../../../public/expandIcon.svg";
import { useState } from "react";
import { useWatchContext } from "../context/watchContext";

interface HeaderProps {
  isStarted: boolean;
}

const Header = ({ isStarted }: HeaderProps) => {
  const [collectionListOpen, setCollectionListOpen] = useState(false);
  const { selectedWatch, selectedCollectionData } = useWatchContext();

  const handleClick = () => {
    setCollectionListOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    window.alert(`You selected ${selectedWatch?.pdpName}`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[72px] grid grid-cols-3 item-start p-[18px] mt-2">
        <div className="ml-4 mt-2">
          <Image alt="apple watch logo" width={90} src={logo} />
        </div>
        <div
          className={`flex items-start justify-center ${
            isStarted ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 ease-linear `}
        >
          <button
            onClick={handleClick}
            className="font-sf text-[17px] font-normal text-[#1d1d1f] leading-[1.4705882353] flex gap-1 justify-center items-center"
          >
            Collections
            <Image className="mt-1" src={expandIcon} alt="expand icon" />
          </button>
        </div>
        <div
          className={`flex justify-end ${
            isStarted ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 ease-linear `}
        >
          <button className="py-[7px] px-4 bg-[#0071e3] text-[14px] text-white font-sf rounded-full text-white self-start w-auto">
            Save
          </button>
        </div>
      </div>
      {collectionListOpen && <CollectionsList handleClick={handleClick} />}
    </div>
  );
};

export default Header;
