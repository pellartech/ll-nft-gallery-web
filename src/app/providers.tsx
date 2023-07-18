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
import UserApi from "@/lib/api/UserApi";
import { SiweMessage } from 'siwe'

export function Providers({ children }: { children: React.ReactNode }) {
    const userApi = new UserApi()
    const [authenticationStatus, setAuthenticationStatus] = useState<"loading" | "unauthenticated" | "authenticated">("loading")

    const authenticationAdapter = createAuthenticationAdapter({
        getNonce: async () => {
            const data = await userApi.getAuthNonce();
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
            const data = await userApi.signin(message, signature)
            if (data.token) {
                window.localStorage.setItem('lightlink-web-token', data.token)
                setAuthenticationStatus("authenticated")
                return true
            }
            setAuthenticationStatus("unauthenticated")
            return false

        },
        signOut: async () => {
            window.localStorage.removeItem('lightlink-web-token')
        },
    })

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const token = window.localStorage.getItem('lightlink-web-token')
            if (token) {
                setAuthenticationStatus("authenticated")
            } else {
                setAuthenticationStatus("unauthenticated")
            }
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
