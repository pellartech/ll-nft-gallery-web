'use client'
import { useState } from 'react'
import { fetchNftsByCollection } from "@/lib/api"
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const [collection, setCollectionAddress] = useState("")
    const [fetchedForCollection, setFetchedForCollection] = useState(false)
    const [inProgress, setInProgress] = useState(false)

    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            setInProgress(true)
            const result = await fetchNftsByCollection(collection)
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
        <div className="flex flex-col items-center justify-center py-8 gap-y-8">
            <div className="flex flex-col w-full justify-center items-center gap-y-8">
                <input onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Collection address"></input>
                <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4"} disabled={inProgress} onClick={
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
    )
}