'use client'
import { useState } from 'react'
import { fetchNftsByCollection } from "@/lib/api"

export default function FetchNftsByCollection() {
    const [collection, setCollectionAddress] = useState("")
    const [fetchedForCollection, setFetchedForCollection] = useState(false)

    const fetchNFTsForCollection = async () => {
        if (collection.length) {
            const result = await fetchNftsByCollection(collection)
            if (result.success) {
                console.log("fetched:", result.success)
                setFetchedForCollection(result.success)
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 gap-y-4">
            <div className="flex flex-col w-full justify-center items-center gap-y-4">
                <input onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="Collection address"></input>
                <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4"} onClick={
                    () => {
                        fetchNFTsForCollection()
                    }
                }>Fetch Nfts By Collection</button>
            </div>
            <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
                {
                    fetchedForCollection ? <div>Fetched !</div> : <></>
                }
            </div>
        </div>
    )

}