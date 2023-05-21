'use client'

import * as React from 'react'
import { WagmiConfig } from 'wagmi'
import {
    createAuthenticationAdapter,
    RainbowKitAuthenticationProvider,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit'

import { chains, config } from '@/lib/wagmi'
import { useEffect, useState } from "react"
import { generateWalletNonce, getAuthStatus, signin, signOut } from '@/lib/api'
import { SiweMessage } from 'siwe'

export function Providers({ children }: { children: React.ReactNode }) {
    const [authenticationStatus, setAuthenticationStatus] = useState<"loading" | "unauthenticated" | "authenticated">("loading")

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            const data = await generateWalletNonce();
            return data.nonce
        },
        createMessage: ({ nonce, address, chainId }) => {
            return new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce,
            });
        },
        getMessageBody: ({ message }: { message: SiweMessage }) => {
            return message.prepareMessage();
        },
        verify: async ({ message, signature }) => {
            const data = await signin(message, signature)
            setAuthenticationStatus(
                data.success ? "authenticated" : "unauthenticated"
            )
            return Boolean(data.success)
        },
        signOut: async () => {
            await signOut();
        },
    })

    useEffect(() => {
        const fetchAuthStatus = async () => {
            // const data = await getAuthStatus()
            // if (!data) {
            //     setAuthenticationStatus("unauthenticated");
            // } else {
            //     setAuthenticationStatus("authenticated");
            // }
            setAuthenticationStatus("unauthenticated")
        }
        fetchAuthStatus()
    }, [])

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <WagmiConfig config={config}>
            <RainbowKitAuthenticationProvider
                adapter={authenticationAdapter}
                status={authenticationStatus}
            >
                <RainbowKitProvider chains={chains}>
                    {mounted && children}
                </RainbowKitProvider>
            </RainbowKitAuthenticationProvider>
        </WagmiConfig>
    )
}
