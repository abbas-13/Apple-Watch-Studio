import Image from "next/image";
import logo from "../../public/appleWatchLogo.svg";

export default function Home() {
  return (
    <div>
      <div className="ml-8 mt-8">
        <Image alt="apple watch logo" width={90} src={logo} />
      </div>
      <div className="mt-20 w-full flex justify-center">
        <div className="flex flex-col gap-2">
          <span className="font-sf text-xl mb-2">Apple Watch Studio</span>
          <span className="font-sf font-[620] text-6xl">Choose a case.</span>
          <span className="font-sf font-[620] text-6xl">Pick a band.</span>
          <span className="font-sf font-[620] text-6xl mr-20">
            Create your own style.
          </span>
          <button className="mt-10 py-2.5 px-6 bg-[#0071e3] font-sf rounded-full text-white self-start w-auto">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
