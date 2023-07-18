'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NftAPI from '@/lib/api/NftApi'

export default function Page() {
    const nftApi = new NftAPI()
    const router = useRouter()
    const [collection, setCollectionAddress] = useState("")
    const [fetchedForCollection, setFetchedForCollection] = useState(false)
    const [inProgress, setInProgress] = useState(false)

    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            setInProgress(true)
            const result = await nftApi.fetchNftsByCollection(collection)
            if (result && result.success) {
                console.log("fetched:", result.success)
                setFetchedForCollection(true)

                return router.push(`/collections/${collection}`)
                // router.push(`/`)

            }
            setInProgress(false)
        }
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="col-span-full">
                        <div className="mt-2">
                            <input onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Collection address"></input>
                        </div>

                    </div>

                    <div className="mt-6 flex items-center ">
                        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" disabled={inProgress} onClick={
                            () => {
                                fetchNFTsForCollection()
                            }
                        }>{!inProgress ? 'Fetch Nfts By Collection' : 'Fetching...'}</button>
                    </div>

                    <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
                        {
                            fetchedForCollection ? <div>Fetched !</div> : <></>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}