'use client'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'
import CollectionsTable from "@/components/collections-table"
import { NFTsCard } from "@/components/nfts-card"
import { Card, Title, Text } from '@tremor/react'

export default function Page({ params }: { params: { address: string } }) {
    const address = params.address

    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`
    const { data } = useSWR(fetchURL, fetcher)
    console.log('data: ', data)

    if (!data) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>Loading...
                </div>
            </main>
        )
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Profile</Title>
            <Card className="mt-6">
                <Title>Name:{data.user.name}</Title>
                <Text>Bio:{data.user.bio}</Text>
                <Text>Discord:{data.user.discord}</Text>
                <Text>Instagram:{data.user.instagram}</Text>
                <Text>Twitter:{data.user.twitter}</Text>
            </Card>

            <Title className="relative mt-5 max-w-md">List of Collections</Title>
            <Card className="mt-6">
                <CollectionsTable items={data.collections} />
            </Card>

            <Title className="relative mt-5 max-w-md">Recently NFTs</Title>
            <Card className="mt-6">
                <NFTsCard items={data.nfts} />
            </Card>
        </main>
    )
}