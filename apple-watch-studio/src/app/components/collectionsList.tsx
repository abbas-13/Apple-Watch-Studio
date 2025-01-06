import { CollectionNames, useWatchContext } from "../context/watchContext";

interface CollectionsListProps {
  handleClick: () => void;
}

export const CollectionsList = ({ handleClick }: CollectionsListProps) => {
  const { selectedCollection, setSelectedCollection } = useWatchContext();

  const selectItem = (value: keyof typeof CollectionNames) => {
    setSelectedCollection(CollectionNames[value]);
    handleClick();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleClick}
    >
      <div
        className="absolute bg-white rounded-2xl shadow-lg top-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-80">
          <ul className="px-6">
            {Object.values(CollectionNames).map((item, index) => (
              <li
                className={`py-[18px] hover:text-blue ${
                  index !== 0 && "border-t-[1px] border-[#d2d2d7]"
                } rounded-none rounded transition text-center`}
                key={item}
              >
                <span
                  onClick={() => {
                    if (selectedCollection !== item) {
                      const selectedCollectionKey = item
                        .toUpperCase()
                        .split(" ")
                        .join("_") as keyof typeof CollectionNames;

                      selectItem(selectedCollectionKey);
                    }
                  }}
                  className={` ${
                    selectedCollection === item
                      ? "cursor-default text-gray-500"
                      : "cursor-pointer hover:text-blue-500"
                  } font-sf text-[17px] tracking-[-.01em] text-[#1d1d1f]`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
