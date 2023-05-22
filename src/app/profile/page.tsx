'use client'
import { Account } from '@/components/chain/Account'
import { Connected } from '@/components/chain/Connected'
import { useAccount } from 'wagmi'
import { getProfile } from '@/lib/api'
import  ProfileForm from '@/components/profile-form'

// export const dynamic = 'force-dynamic'

export default function Page() {
    const { isConnected } = useAccount()

    if (!isConnected) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>You must be signed in to view the protected content on this page.
                </div>
            </main>
        )
    }
    // const user = await getProfile()

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Connected>
                <h2>Account</h2>
                <Account />
                <ProfileForm />
            </Connected>
        </main>
    )
}