"use client";
import { NFTsCard } from "@/components/nfts-card";
import { Card, Metric, Text, Title } from "@tremor/react";
import Search from "@/components/search";
import { useAccount } from "wagmi";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Back } from "@/components/back";
import {
  formartTime,
  formatAccountDisplay,
  generateEtherscanRootUrl,
  getImage,
} from "@/utils/utils";
import { SelectFilter } from "@/components/select-filter";
import { useEffect, useState } from "react";
import { getCollection, searchNfts } from "@/lib/api";

const filterNFT = [
  { value: "desc_created", label: "Newest", type: "created" },
  { value: "asc_created", label: "Oldest", type: "created" },
];

export default function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const contract_address = params.address;

  const [selectFilterNFT, setSelectFilterNFT] = useState(filterNFT[0]);
  const [collection, setCollection] = useState<any>();
  const [nftsData, setNftsData] = useState<any>();
  const [filter, setFilter] = useState({
    terms: search,
    page_index: 1,
    page_size: 20,
    sort_by: "created",
    order_by: "desc",
  });

  useEffect(() => {
    setFilter({ ...filter, terms: search });
  }, [search]);

  useEffect(() => {
    getDataNfts();
  }, [filter]);

  const getDataNfts = async () => {
    const data = await searchNfts(filter);
    setNftsData(data);
  };

  const getDataCollection = async () => {
    const data = await getCollection(contract_address);
    setCollection(data);
  };

  useEffect(() => {
    getDataCollection();
  }, [contract_address]);

  useEffect(() => {
    if (selectFilterNFT.value === "desc_created") {
      setFilter({ ...filter, sort_by: "created", order_by: "desc" });
    }
    if (selectFilterNFT.value === "asc_created") {
      setFilter({ ...filter, sort_by: "created", order_by: "asc" });
    }
  }, [selectFilterNFT]);

  // const { data: collection } = useSWR(collectionFetchURL, fetcher);
  // const { data: nftsData } = useSWR(nftsFetchURL, fetcher);

  if (!collection || !nftsData) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="">
      <div className="bg-[#141414] text-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:justify-between lg:flex-row items-center pb-6 p-4 md:p-10">
          <div className="w-full lg:w-auto">
            <Back />
            <div className="flex items-center gap-6 mt-6">
              <div
                className="rounded-2xl w-[100px]"
                style={{
                  backgroundImage: `url(${getImage(collection?.logo?.normal)})`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  backgroundColor: "#000000",
                }}
              >
                <div className="pt-[100%]"></div>
              </div>
              <div>
                <div className="font-semibold text-[40px]">
                  {collection?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-[#222222] flex flex-col gap-2.5 rounded-xl w-full lg:w-[300px]">
            <div className="text-sm text-grey-80 flex justify-between items-center">
              Items:{" "}
              <span className="font-medium text-sm text-white">
                {collection?.total_supply} NFTs
              </span>
            </div>
            <div className="text-sm text-grey-80 flex justify-between items-center">
              Created:{" "}
              <span className="font-medium text-sm text-white">
                {formartTime(collection?.created)}
              </span>
            </div>
            <div className="text-sm text-grey-80 flex justify-between items-center">
              Address:{" "}
              <a
                className="font-medium text-sm text-white flex gap-1.5"
                href={generateEtherscanRootUrl({
                  contractAddress: collection?.contract_address,
                })}
                target="_blank"
              >
                {formatAccountDisplay(collection?.contract_address)}{" "}
                <img alt="" src="/images/icons/new-link.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <div className="flex gap-5">
          <Search type="nft" />
          <div className="w-[200px]">
            <SelectFilter
              options={filterNFT}
              selectedOption={selectFilterNFT}
              onSelectedOption={(selected: any) => setSelectFilterNFT(selected)}
            />
          </div>
        </div>
        <NFTsCard items={nftsData.items} />
      </div>
    </main>
  );
}
