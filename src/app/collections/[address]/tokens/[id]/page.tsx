"use client";
import { NFTCard } from "@/ui/components/nft-card";
import NftApi from "@/lib/api/NftApi"
import { Suspense } from "react";
import { Card, Metric, Text, Title } from "@tremor/react";
import { SendNFT } from "@/ui/components/send-nft";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { formartTime, formatAccountDisplay, getImage } from "@/utils/utils";
import { Back } from "@/ui/components/back";
import { isEmpty, map, size } from "lodash";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const nftApi = new NftApi()
  const contract_address = params.address;
  const id = params.id;

  const { isConnected, address } = useAccount();

  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections/${contract_address}/nfts/${id}`;
  const { data: nft, error } = useSWR(fetchURL, fetcher);

  const [inProgress, setInProgress] = useState(false);
  const [tabActive, setTabActive] = useState(3);
  const [statusAction, setStatusAction] = useState(1);

  if (!nft) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>loading...</div>
      </main>
    );
  }

  const handleRefreshNftMetaData = async () => {
    setInProgress(true);
    await nftApi.refreshNftMetaData(contract_address, id);
    setInProgress(false);
  };

  console.log("nft: ", nft);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl text-white">
      <div className="flex flex-col lg:flex-row items-start gap-12">
        <div
          className="rounded-2xl mx-auto max-w-[500px] lg:max-w-full w-full lg:w-1/2"
          style={{
            backgroundImage: `url(${getImage(nft?.image?.normal)})`,
            backgroundPosition: "50% 50%",
            backgroundSize: "cover",
            backgroundColor: "#000000",
          }}
        >
          <div className="pt-[100%]"></div>
        </div>
        <div className="w-full lg:w-1/2">
          <Back />
          <div className="font-semibold text-3xl md:text-4xl lg:text-5xl mt-2">
            {nft?.name}
          </div>
          <div className="font-semibold text-xl mt-4">
            0.231 LL <span className="text-grey-80 text-base ml-2">$0.52</span>
          </div>
          <div className="text-grey-80 mt-4 text-base">{nft?.description}</div>
          <div className="my-8 flex">
            <div className="w-1/2 flex items-center gap-3">
              <div
                className="rounded-full w-10 h-10"
                style={{
                  backgroundImage: `url(/images/caro.png)`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  backgroundColor: "#000000",
                }}
              >
                <div className="pt-[100%]"></div>
              </div>
              <div>
                <div className="text-sm text-grey-80">Creator</div>
                <div className="font-semibold">Creator name</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3">
              <div
                className="rounded-lg w-10 min-w-[40px] h-10"
                style={{
                  backgroundImage: `url(/images/caro.png)`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "cover",
                  backgroundColor: "#000000",
                }}
              >
                <div className="pt-[100%]"></div>
              </div>
              <div>
                <div className="text-sm text-grey-80">Collection</div>
                <div className="font-semibold">Collection name</div>
              </div>
            </div>
          </div>
          <button className="w-full bg-white text-black font-semibold rounded-lg p-3">
            Buy NFT
          </button>
          <div className="mt-10 mb-4 flex gap-4">
            <span
              className={`${
                tabActive === 1 ? "" : "opacity-50"
              } font-semibold text-lg cursor-pointer`}
              onClick={() => setTabActive(1)}
            >
              Traits
            </span>
            <span
              className={`${
                tabActive === 2 ? "" : "opacity-50"
              } font-semibold text-lg cursor-pointer`}
              onClick={() => setTabActive(2)}
            >
              Details
            </span>
            <span
              className={`${
                tabActive === 3 ? "" : "opacity-50"
              } font-semibold text-lg cursor-pointer`}
              onClick={() => setTabActive(3)}
            >
              Activity
            </span>
          </div>
          {tabActive === 1 && !isEmpty(nft?.attributes) && (
            <div className="p-4 bg-grey rounded-xl">
              {map(nft?.attributes, (item: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-grey-80 text-xs mb-0.5">
                        {item?.trait_type}
                      </div>
                      <div className="font-medium text-sm">{item?.value}</div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div>
                        <div className="text-grey-80 text-xs mb-0.5">
                          Rarity
                        </div>
                        <div className="font-medium text-sm">1.5%</div>
                      </div>
                      <img src="/images/icons/arrow-right.svg" alt="" />
                    </div>
                  </div>
                  {size(nft?.attributes) > 1 &&
                    index < size(nft?.attributes) - 1 && (
                      <div className="w-full h-[1px] bg-line my-4"></div>
                    )}
                </div>
              ))}
            </div>
          )}
          {tabActive === 2 && (
            <div className="p-4 bg-grey rounded-xl font-medium flex flex-col gap-2.5">
              <div className="flex justify-between">
                <div className="text-grey-80">Contact address</div>
                <div>{formatAccountDisplay(nft?.contract_address)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-grey-80">Token ID</div>
                <div>{nft?.token_id}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-grey-80">Token Standard</div>
                <div>{nft?.type}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-grey-80">Chain</div>
                <div></div>
              </div>
              <div className="flex justify-between">
                <div className="text-grey-80">Last Updated</div>
                <div>{formartTime(nft?.modified)}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-grey-80 flex gap-1.5">
                  Creator earning{" "}
                  <img
                    title="Fee"
                    className="cursor-pointer"
                    src="/images/icons/tooltip.svg"
                    alt=""
                  />
                </div>
                <div></div>
              </div>
            </div>
          )}
          {tabActive === 3 && (
            <div>
              <div className="flex gap-2 mb-3">
                <span
                  className={`${
                    statusAction === 1 ? "text-white" : "text-grey-80"
                  } cursor-pointer px-1.5 py-0.5 bg-dark-90 rounded-lg font-medium`}
                  onClick={() => setStatusAction(1)}
                >
                  List
                </span>
                <span
                  className={`${
                    statusAction === 2 ? "text-white" : "text-grey-80"
                  } cursor-pointer px-1.5 py-0.5 bg-dark-90 rounded-lg font-medium`}
                  onClick={() => setStatusAction(2)}
                >
                  Sell
                </span>
                <span
                  className={`${
                    statusAction === 3 ? "text-white" : "text-grey-80"
                  } cursor-pointer px-1.5 py-0.5 bg-dark-90 rounded-lg font-medium`}
                  onClick={() => setStatusAction(3)}
                >
                  Mint
                </span>
              </div>
              <div className="p-4 bg-grey rounded-xl flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full w-9 min-w-[36px] h-9"
                      style={{
                        backgroundImage: `url(/images/caro.png)`,
                        backgroundPosition: "50% 50%",
                        backgroundSize: "cover",
                        backgroundColor: "#000000",
                      }}
                    >
                      <div className="pt-[100%]"></div>
                    </div>
                    <div>
                      <div className="text-sm text-grey-80 mb-0.5">
                        Listed by{" "}
                        <span className="font-semibold text-white ml-1.5">
                          User name
                        </span>
                      </div>
                      <div className="text-grey-80 text-xs">
                        Sep 4, 2022 at 7:10am
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold flex">
                    0.03 LL{" "}
                    <img
                      className="ml-2"
                      alt=""
                      src="/images/icons/new-link.svg"
                    />
                  </div>
                </div>
                <div className="w-full h-[1px] bg-line my-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full w-9 min-w-[36px] h-9"
                      style={{
                        backgroundImage: `url(/images/caro.png)`,
                        backgroundPosition: "50% 50%",
                        backgroundSize: "cover",
                        backgroundColor: "#000000",
                      }}
                    >
                      <div className="pt-[100%]"></div>
                    </div>
                    <div>
                      <div className="text-sm text-grey-80 mb-0.5">
                        Sold to{" "}
                        <span className="font-semibold text-white ml-1.5">
                          User name
                        </span>
                      </div>
                      <div className="text-grey-80 text-xs">
                        Sep 4, 2022 at 7:10am
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold flex">
                    1.55 LL{" "}
                    <img
                      className="ml-2"
                      alt=""
                      src="/images/icons/new-link.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Title>NFT Detail</Title>
            <Card className="mt-6">
                <Metric>Name:{nft.name}</Metric>

                <Title>Type:{nft.type}</Title>

                <Text>Collection:
                    <Link key={nft.key} as={`/collections/${nft.contract_address}`} href="/collections/[address]">
                        {nft.contract_address}
                    </Link>
                </Text>

                <Text>ID:{nft.token_id}</Text>
                <Text>Attributes:{JSON.stringify(nft.attributes)}</Text>

                <div className="mt-6 flex items-center ">
                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={inProgress}
                        onClick={
                            () => {
                                handleRefreshNftMetaData()
                            }
                        }>{!inProgress ? 'Refresh Metadata' : 'Fetching...'}</button>
                </div>
            </Card>
            <Card className="mt-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <NFTCard item={nft} key={nft.key}></NFTCard>
                    {
                        isConnected && String(address) === nft.owner_address ?
                            <SendNFT contract={nft.contract_address} owner={nft.owner_address} tokenId={nft.token_id} />
                            : <></>
                    }
                </Suspense>
            </Card> */}
    </main>
  );
}
