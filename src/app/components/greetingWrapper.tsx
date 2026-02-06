interface GreetingWrapperProps {
  handleGetStarted: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  isStarted: boolean;
}

const GreetingWrapper = ({
  handleGetStarted,
  isStarted,
}: GreetingWrapperProps) => {
  return (
    <div
      className={`mt-14 px-4 md:px-0 flex flex-col z-10 justify-self-center transition-all ease-out ${
        isStarted
          ? "opacity-0 pointer-events-none absolute"
          : "opacity-100 translate-y-0 relative mb-16"
      } `}
    >
      <span className="font-sf text-[21px] font-[400] text-[#1d1d1f] leading-[1.381002381] pb-[10px]">
        Apple Watch Studio
      </span>
      <span className="font-sf font-[600] text-[64px] leading-[1.0625] tracking-[-.009em]">
        Choose a case.
      </span>
      <span className="font-sf font-[600] text-[64px] leading-[1.0625] tracking-[-.009em]">
        Pick a band.
      </span>
      <span className="font-sf font-[600] text-[64px] leading-[1.0625] tracking-[-.009em]">
        Create your own style.
      </span>
      <button
        onClick={handleGetStarted}
        className="mt-[42px] py-[9px] px-[22px] bg-[#0071e3] font-sf text-[17px] rounded-full text-white self-start w-auto"
      >
        Get started
      </button>
    </div>
  );
};

export default GreetingWrapper;
