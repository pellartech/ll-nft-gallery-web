
import CollectionsTable from "@/components/collections-table"
import { NFTCard } from "@/components/nft-card"
import { searchCollections, searchNfts } from "@/lib/api"

import { Card, Title, Text } from '@tremor/react'


export default async function Page() {
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
                <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
                    {
                        nftsData.items.map(item => {
                            return (
                                <NFTCard item={item} key={item.key}></NFTCard>
                            )
                        })
                    }
                </div>
            </Card>
        </main>
    );
}
