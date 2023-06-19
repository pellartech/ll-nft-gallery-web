"use client";
import { Account } from "@/components/chain/Account";
import { Connected } from "@/components/chain/Connected";
import ProfileForm from "@/components/profile-form";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import {
  formatAccountDisplay,
  generateEtherscanRootUrl,
  getImage,
} from "@/utils/utils";
import { Back } from "@/components/back";
import { useState } from "react";
import { Collection } from "@/interfaces/ICollection";
import { CollectionCard } from "@/components/collection-card";
import { NFT } from "@/interfaces/INFT";
import { NFTCard } from "@/components/nft-card";

// export const dynamic = 'force-dynamic'

export default function Page() {
  const { isConnected, address } = useAccount();
  const [tabActive, setTabActive] = useState(1);
  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`;
  const { data }: any = useSWR(fetchURL, fetcher);

  return (
    <main className="text-white">
      <div className="bg-[#141414]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:justify-between lg:flex-row items-center pb-6 p-4 md:p-10">
          <div className="w-full lg:w-auto">
            <Back />
            <div className="flex items-center gap-6 mt-6">
              <div
                className="rounded-full w-[100px]"
                style={{
                  backgroundImage: `url(${getImage(data?.user?.logo?.normal)})`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  backgroundColor: "#000000",
                }}
              >
                <div className="pt-[100%]"></div>
              </div>
              <div>
                <div className="font-semibold text-[40px]">User name</div>
                <div className="font-normal text-grey-80">
                  {formatAccountDisplay(data?.user?.wallet_address)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="mb-6 flex gap-4">
          <span
            className={`${
              tabActive === 1 ? "" : "opacity-50"
            } font-semibold text-2xl cursor-pointer`}
            onClick={() => setTabActive(1)}
          >
            Collections
          </span>
          <span
            className={`${
              tabActive === 2 ? "" : "opacity-50"
            } font-semibold text-2xl cursor-pointer`}
            onClick={() => setTabActive(2)}
          >
            NFTs
          </span>
        </div>
        {tabActive === 1 && (
          <div className="flex flex-wrap gap-5">
            {data?.collections?.map((item: Collection, index: number) => (
              <CollectionCard item={item} key={index} />
            ))}
          </div>
        )}
        {tabActive === 2 && (
          <div className="flex flex-wrap gap-5">
            {data?.nfts?.map((item: NFT, index: number) => (
              <NFTCard item={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
