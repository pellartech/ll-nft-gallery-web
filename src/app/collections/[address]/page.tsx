'use client'
import { NFTsCard } from "@/components/nfts-card"
import { Card, Metric, Text, Title } from '@tremor/react'
import Search from "@/components/search"
import { useAccount } from 'wagmi'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'

export default function Page({ params, searchParams }: { params: { address: string }, searchParams: { q: string } }) {
    const search = searchParams.q ?? ''
    const contract_address = params.address

    const { isConnected, address } = useAccount()

    const collectionFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections/${contract_address}`

    const nftsFetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/nfts?page_index=1&page_size=20&order_by=created&sort_by=desc&contract_address=${contract_address}&terms=${search}`
    const { data: collection } = useSWR(collectionFetchURL, fetcher)
    const { data: nftsData } = useSWR(nftsFetchURL, fetcher)


    if (!collection || !nftsData) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>This contract has not been imported.
                </div>
            </main>
        )
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Collection</Title>
            <Card className="mt-6">
                {
                    collection.logo ? <img className="object-cover h-128 w-128 rounded-t-md" src={`${process.env.NEXT_PUBLIC_S3_BASEURL}/${collection.logo && collection.logo.small}`} ></img>
                        : <></>
                }
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

                {
                    isConnected && String(address) === collection.owner_address ?
                        <a href={`/collections/${collection.contract_address}/edit`} className="text-sm font-semibold leading-6 text-gray-900">
                            Edit
                        </a> : <></>
                }


            </Card>
            <Title className="relative mt-5 max-w-md">NFTs</Title>
            <Search type='nft' />
            <Card className="mt-6">
                <NFTsCard items={nftsData.items} />
            </Card>
        </main>
    )
}



