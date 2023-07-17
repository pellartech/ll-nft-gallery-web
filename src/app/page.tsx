"use client";
import CollectionsTable from "@/ui/components/collections-table";
import { NFTsCard } from "@/ui/components/nfts-card";
import { Card, Title, Text } from "@tremor/react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function Home() {
  const collectionsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections?page_index=1&page_size=10&order_by=total_supply&sort_by=desc`;
  const nftsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/nfts?page_index=1&page_size=9&order_by=created&sort_by=desc`;
  const { data: collectionsData } = useSWR(collectionsFetchURL, fetcher);
  const { data: nftsData } = useSWR(nftsFetchURL, fetcher);

  if (!collectionsData || !nftsData) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="text-4xl text-white font-semibold mb-8">
        List of Collections
      </div>
      {/* <Card className="mt-6 bg-dark-900"> */}
      <CollectionsTable items={collectionsData.items} />
      {/* </Card> */}

      <div className="text-4xl text-white font-semibold my-8">
        Most Recently NFTs
      </div>
      {/* <Card className="mt-6"> */}
      <NFTsCard items={nftsData.items} />
      {/* </Card> */}
    </main>
  );
}
