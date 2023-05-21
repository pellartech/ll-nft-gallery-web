'use client'
import { NFTCard } from "@/components/nft-card"
import { getNftDetail } from "@/lib/api"
import { Suspense } from 'react'
import { Card, Metric, Text, Title, Subtitle, Bold, Italic } from '@tremor/react'

export default async function Page({ params }: { params: { address: string, id: string } }) {
    const address = params.address
    const id = params.id

    const nft = await getNftDetail(address, id)
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>NFT</Title>
            <Card className="mt-6">
                <Metric>Name:{nft.name}</Metric>

                <Title>Type:{nft.type}</Title>

                <Text>Contract:{nft.contract_address}</Text>

                <Text>ID:{nft.token_id}</Text>
            </Card>
            <Card className="mt-6">
                <Suspense fallback={<div>Loading...</div>}>
                    <NFTCard item={nft} key={nft.key}></NFTCard>
                </Suspense>
            </Card>
        </main>
    )
}

