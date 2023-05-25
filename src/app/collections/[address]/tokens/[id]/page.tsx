'use client'
import { NFTCard } from "@/components/nft-card"
import { refreshNftMetaData } from "@/lib/api"
import { Suspense } from 'react'
import { Card, Metric, Text, Title } from '@tremor/react'
import { SendNFT } from '@/components/send-nft'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function Page({ params }: { params: { address: string, id: string } }) {
    const contract_address = params.address
    const id = params.id

    const { isConnected, address } = useAccount()

    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections/${contract_address}/nfts/${id}`
    const { data: nft, error } = useSWR(fetchURL, fetcher)

    const [inProgress, setInProgress] = useState(false)

    if (!nft) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>loading...
                </div>
            </main>
        )
    }

    const handleRefreshNftMetaData = async () => {
        setInProgress(true)
        await refreshNftMetaData(contract_address, id)
        setInProgress(false)
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>NFT Detail</Title>
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
            </Card>
        </main>
    )
}

