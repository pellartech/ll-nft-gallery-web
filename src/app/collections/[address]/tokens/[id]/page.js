import { NFTCard } from "@/components/nft-card"
import { getNft } from "@/lib/api"

export default async function Page({ params }) {
    const address = params.address
    const id = params.id

    const nft = await getNft(address, id)
    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    NFT
                </h2>
            </div>

            <NFTCard item={nft} key={nft.key}></NFTCard>
        </div>
    )
}



