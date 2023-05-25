'use client'
import { Account } from '@/components/chain/Account'
import { Connected } from '@/components/chain/Connected'
import ProfileForm from '@/components/profile-form'
import useSWR from "swr"
import fetcher from '@/lib/fetcher'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'

// export const dynamic = 'force-dynamic'

export default function Page() {
    const { isConnected, address } = useAccount()
    const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/auth/profile`
    const { data, error } = useSWR(fetchURL, fetcher)
    if (!isConnected || error) {
        disconnect()
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>You must be signed in to view the protected content on this page.
                </div>
            </main>
        )
    } else {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <Connected>
                    <h2>Account</h2>
                    <Account />
                    <ProfileForm user={data} />
                </Connected>
            </main>
        )
    }
}