import CollectionsTable from "@/components/collections-table"
import { NFTsCard } from "@/components/nfts-card"
import { searchCollections, searchNfts } from "@/lib/api"

import { Card, Title, Text } from '@tremor/react'


export default async function Home() {

  const collectionsData = await searchCollections({ page_index: 1, page_size: 10, sort_by: 'total_supply', order_by: 'desc' })
  const nftsData = await searchNfts({ page_index: 1, page_size: 9, sort_by: 'created', order_by: 'desc' })

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
