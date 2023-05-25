'use client'
import CollectionsTable from "@/components/collections-table"
import { NFTsCard } from "@/components/nfts-card"
import { Card, Title, Text } from '@tremor/react'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'


export default function Home() {
  const collectionsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections?page_index=1&page_size=10&order_by=total_supply&sort_by=desc`
  const nftsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/nfts?page_index=1&page_size=9&order_by=created&sort_by=desc`
  const { data: collectionsData } = useSWR(collectionsFetchURL, fetcher)
  const { data: nftsData } = useSWR(nftsFetchURL, fetcher)

  if (!collectionsData || !nftsData) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>Loading...
        </div>
      </main>
    )
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>List of Collections</Title>
      <Card className="mt-6">
        <CollectionsTable items={collectionsData.items} />
      </Card>

      <Title className="relative mt-5 max-w-md">Most Recently NFTs</Title>
      <Card className="mt-6">
        <NFTsCard items={nftsData.items} />
      </Card>
    </main>
  )
}
