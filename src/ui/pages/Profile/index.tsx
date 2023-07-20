"use client"
import { PageHeader, CollectionGrid, NftGrid } from "@/ui/modules"
import ExpandableText from "@/ui/components/expandable-text"
import { useMemo, useState } from "react"
import { useAccount } from "wagmi"
import Link from "next/link"
import { formatAccountDisplay, getImage } from "@/utils/utils"
import useSWR from "swr"
import fetcher from "@/lib/fetcher"

interface ProfileProps {
    address: string
}

const Profile = ({ address }: ProfileProps) => {
    const [selectedSegment, setSelectedSegment] = useState(0)
    const { address: connectedAddress } = useAccount();
    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`
    const { data } = useSWR(fetchURL, fetcher)

    const thumbImageUrl = useMemo(() => {
        console.log('connected: ', connectedAddress?.toLowerCase())
        console.log('user: ', address.toLowerCase())
        if (data?.user?.avatar?.original) {
            return getImage(data?.user?.avatar?.original)
        }
    }, [data])

    return (
        <>
            <PageHeader thumbUrl={thumbImageUrl} />

            <div className="text-4xl text-white font-semibold mb-4 mt-80 flex justify-start gap-2 items-center">
                {data?.user?.name || formatAccountDisplay(address)}

                {connectedAddress?.toLowerCase() === address.toLowerCase() &&
                    <Link href="/profile/edit">
                        <img className=" h-7" src="/images/icons/edit.svg" alt="" />
                    </Link>
                }
            </div>

            <div className="w-6/12 mb-4">
                <ExpandableText text={data?.user?.bio || 'Bio has not been set'} limit={200} />
            </div>

            <button type="button" className="flex gap-1 align-middle justify-center mb-12">
                <img className="m-auto" src="/images/icons/wallet.svg" alt="" />
                <div className="m-auto text-white text-sm">{formatAccountDisplay(address)}</div>
            </button>

            <div className="flex justify-start gap-2 mb-4">
                <button onClick={() => setSelectedSegment(0)} className={`text-2xl ${selectedSegment === 0 ? 'text-white' : 'text-grey-80'}`}>Collections</button>
                <button onClick={() => setSelectedSegment(1)} className={`text-2xl ${selectedSegment === 1 ? 'text-white' : 'text-grey-80'}`}>NFTs</button>
            </div>

            {selectedSegment === 0 && <CollectionGrid params={{ address: "" }} searchParams={{ q: "" }} />}
            {selectedSegment === 1 && <NftGrid params={{ address: "" }} searchParams={{ q: "" }} />}

        </>
    )
}

export default Profile