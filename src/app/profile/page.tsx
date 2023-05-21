import { Account } from '@/components/chain/Account'
import { Balance } from '@/components/chain/Balance'
import { ConnectButton } from '@/components/chain/ConnectButton'
import { Connected } from '@/components/chain/Connected'
import { Card, Title, Text } from '@tremor/react'

// export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Connected>
                <h2>Account</h2>
                <Account />
                <br />
                <hr />
                <h2>Balance</h2>
                <Balance />
            </Connected>
        </main>
    )
}