'use client'
import { NFTsCard } from "@/components/nfts-card"
import { getCollection, searchNfts } from "@/lib/api"
import { Card, Metric, Text, Title, Subtitle, Bold, Italic } from '@tremor/react'
import Search from "@/components/search"

// export const dynamic = 'force-dynamic'

export default async function Page({ params, searchParams }: { params: { address: string }, searchParams: { q: string } }) {
    const search = searchParams.q ?? ''
    const address = params.address

    const collection = await getCollection(address)

    const nftsData = await searchNfts({ page_index: 1, page_size: 20, sort_by: 'desc', order_by: 'created', contract_address: address, terms: search })

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Collection</Title>
            <Card className="mt-6">
                <Metric>Name:{collection.name}</Metric>

                <Title>Symbol:{collection.symbol}</Title>

                <Text>Contract:{collection.contract_address}</Text>

                <Text>Total Supply:{collection.total_supply}</Text>

                {/* <Text>Fetched: {collection.number_of_fetched}</Text> */}
            </Card>
            <Title className="relative mt-5 max-w-md">NFTs</Title>
            <Search type='nft' />
            <Card className="mt-6">
                <NFTsCard items={nftsData.items} />
            </Card>
        </main>
    )
}



