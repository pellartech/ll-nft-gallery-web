
import { CollectionCard } from "@/components/collection-card"
import { NFTCard } from "@/components/nft-card"
import { searchCollections, searchNfts } from "@/lib/api"

export default async function Page() {
    const collectionsData = await searchCollections({ page_index: 1, page_size: 10, sort_by: 'desc', order_by: 'total_supply' })
    const nftsData = await searchNfts({ page_index: 1, page_size: 9, sort_by: 'desc', order_by: 'created' })
    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Featured Collections
                </h2>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {
                    collectionsData.items.map((item) => {
                        return (
                            <CollectionCard item={item} key={item.key}></CollectionCard>

                        )
                    })
                }
            </ul>


            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Recently Added NFTs
                </h2>
            </div>
            <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
                {
                    nftsData.items.map(item => {
                        return (
                            <NFTCard item={item} key={item.key}></NFTCard>
                        )
                    })
                }
            </div>
        </>
    )
}
