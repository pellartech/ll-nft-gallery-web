import Link from "next/link";
import { Collection } from "@/interfaces/ICollection";
import { formatAccountDisplay, getImage } from "@/utils/utils";

export const CollectionCard = ({ item }: { item: Collection }) => {
  return (
    <div
      key={item.key}
      className="w-full flex flex-col bg-dark-90 border border-[#313131] rounded-xl"
    >
      <Link
        key={item.key}
        as={`/collections/${item.contract_address}`}
        href="/collections/[address]/tokens/[id]"
      >
        <div>
          <div
            className="rounded-t-xl"
            style={{
              backgroundImage: `url(${getImage(item?.logo?.normal)})`,
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
              backgroundColor: "#000000",
            }}
          >
            <div className="pt-[100%]"></div>
          </div>
        </div>
        <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
          <div className="">
            <div className="text-grey-80 text-xs text-right mb-1">
              {item?.total_supply} NFTs
            </div>
            <h2 className="text-base text-white">{item.name}</h2>
            <p className="text-grey-80 text-xs flex items-center justify-between mt-3">
              Owner:<span className="text-white text-sm">{formatAccountDisplay(item.owner_address)}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
