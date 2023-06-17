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

export default function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const contract_address = params.address;

  const { isConnected, address } = useAccount();

  const collectionFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections/${contract_address}`;

  const nftsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/nfts?page_index=1&page_size=20&order_by=created&sort_by=desc&contract_address=${contract_address}&terms=${search}`;
  const { data: collection } = useSWR(collectionFetchURL, fetcher);
  const { data: nftsData } = useSWR(nftsFetchURL, fetcher);

  if (!collection || !nftsData) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>Loading...</div>
      </main>
    );
  }

  console.log('nftsData: ', nftsData)

  return (
    <main className="text-white">
      <div className="bg-[#141414]">
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
                <img src="/images/icons/new-link.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <Title>Collection</Title> */}
      {/* <Card className="mt-6">
        {collection.logo ? (
          <img
            className="object-cover h-128 w-128 rounded-t-md"
            src={`${process.env.NEXT_PUBLIC_S3_BASEURL}/${
              collection.logo && collection.logo.small
            }`}
          ></img>
        ) : (
          <></>
        )}
        <Metric>Name:{collection.name}</Metric>

        <Title>Symbol:{collection.symbol}</Title>

        <Text>Contract:{collection.contract_address}</Text>

        <Text>Owner:{collection.owner_address}</Text>

        <Text>Total Supply:{collection.total_supply}</Text>
        <Text>About: {collection.description}</Text>
        <Text>Website: {collection.website}</Text>
        <Text>Discord: {collection.discord}</Text>
        <Text>Instagram: {collection.instagram}</Text>
        <Text>Twitter: {collection.twitter}</Text>

        {isConnected && String(address) === collection.owner_address ? (
          <a
            href={`/collections/${collection.contract_address}/edit`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Edit
          </a>
        ) : (
          <></>
        )}
      </Card> */}
      <div className="p-4 md:p-10 mx-auto max-w-7xl">
        <Search type="nft" />
        <NFTsCard items={nftsData.items} />
      </div>
    </main>
  );
}
