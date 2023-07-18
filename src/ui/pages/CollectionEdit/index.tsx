'use client'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'
import React, { useState, useEffect } from 'react'
import CollectionForm from '@/ui/components/collection-form'

interface CollectionEditProps {
    address: string
}

const CollectionEdit = ({ address }: CollectionEditProps) => {
    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/collections/${address}`
    const { data, error } = useSWR(fetchURL, fetcher)

    if (!data) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>loading...
                </div>
            </main>
        )
    }

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <CollectionForm collection={data} />
        </main>
    )
}

export default CollectionEdit