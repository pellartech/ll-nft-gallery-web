import React from 'react'
import CollectionEdit from "@/ui/pages/CollectionEdit"
import { Metadata, ResolvingMetadata } from 'next'
import CollectionAPI from '@/lib/api/CollectionApi'
 
type Props = {
  params: { address: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent?: ResolvingMetadata
): Promise<Metadata> {
    const collectionApi = new CollectionAPI()
    const address = params.address
    const collection = await collectionApi.getCollection(address)
    return {
        title: `LL NFT | Edit Collection | ${collection.name}`,
    }
}

export default function Page({ params }: { params: { address: string } }) {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <CollectionEdit address={params.address} />
        </main>
    )
}
