import { NFTCard } from "../nft-card"
import { searchNfts } from "@/lib/api"

export default async function RecentNfts() {
    const nftsData = await searchNfts({ page_index: 1, page_size: 9, sort_by: 'desc', order_by: 'created' })
    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Recently Added NFTs
                </h2>
            </div>
            <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
                {
                    nftsData.items.map(nft => {
                        return (
                            <NFTCard nft={nft}></NFTCard>
                        )
                    })
                }
            </div>
        </div>
    )
}