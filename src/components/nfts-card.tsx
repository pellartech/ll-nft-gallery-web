import { NFT } from "@/interfaces/INFT";
import { NFTCard } from "./nft-card";

export const NFTsCard = ({ items }: { items: NFT[] }) => {
  return (
    <div className="flex flex-wrap gap-5 mt-8">
      {items.map((item, index: number) => (
        <NFTCard item={item} key={index} />
      ))}
    </div>
  );
};
