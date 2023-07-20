import { NFT } from "@/interfaces/INFT";
import { NFTCard } from "./nft-card";

export const NFTsCard = ({ items, cols = 5 }: { items: NFT[], cols?: number }) => {
  return (
    <div className={`grid grid-cols-${cols} gap-5 mt-8`}>
      {items.map((item, index: number) => (
        <div key={index} className=" flex flex-wrap">
          <NFTCard item={item} key={index} />
        </div>
      ))}
    </div>
  );
};
