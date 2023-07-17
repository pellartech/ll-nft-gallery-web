"use client"
import { PageHeader, CollectionGrid, NftGrid } from "@/modules"
import ExpandableText from "@/ui/components/expandable-text"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Link from "next/link"
import { formatAccountDisplay } from "@/utils/utils"
import useSWR from "swr"
import fetcher from "@/lib/fetcher"
import CollectionAPI from "@/lib/api/CollectionApi";
import { Collection } from "@/interfaces/ICollection"

interface CollectionProps {
    address: string
}

const Collection = ({ address }: CollectionProps) => {
    const collectionApi = new CollectionAPI()
    const [collection, setCollection] = useState<Collection>()
    const getDataCollection = async () => {
        const data = await collectionApi.getCollection(address);
        setCollection(data);
    };

    useEffect(() => {
        getDataCollection();
    }, [address]);

    const { address: connectedAddress } = useAccount();

    return (
        <>
            <PageHeader />

            <div className="text-4xl text-white font-semibold mb-8 mt-80 flex justify-start gap-2 items-center">
                {collection?.name}

                {collection?.owner_address?.toLocaleLowerCase() === address.toLowerCase() &&
                    <Link
                        href="/profile/edit"
                    >
                        <img className=" h-7" src="/images/icons/edit.svg" alt="" />
                    </Link>

                }
            </div>

            <div className="w-6/12 mb-8">
                <ExpandableText text={'Description has not been set'} limit={200} />
            </div>

            <button type="button" className="flex gap-1 align-middle justify-center mb-8">
                <img className="m-auto" src="/images/icons/wallet.svg" alt="" />
                <div className="m-auto text-white text-sm">{formatAccountDisplay(address)}</div>
            </button>

            <NftGrid params={{ address: "" }} searchParams={{ q: "" }} />
        </>
    )
}

export default Collection