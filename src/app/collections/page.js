'use client'

import CollectionsTable from "@/components/collections-table"
import { NFTCard } from "@/components/nft-card"
import Search from "@/components/search"
import { searchCollections } from "@/lib/api"

import { Card, Title, Text } from '@tremor/react'

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  const search = searchParams.q ?? ''
  const collectionsData = await searchCollections({ terms: search, page_index: 1, page_size: 30, sort_by: 'total_supply', order_by: 'desc' })

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>List of Collections</Title>
      <Search type='collection'/>
      <Card className="mt-6">
        <CollectionsTable items={collectionsData.items} />
      </Card>
    </main>
  )
}