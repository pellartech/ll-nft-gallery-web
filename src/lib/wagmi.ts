import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet, sepolia } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { lightlinkChain } from './lightlinkChain'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [lightlinkChain, sepolia, goerli],
  [
    // publicProvider(),
    // alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY! }),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'FekH8B5jV2yW48jEGC1uxn55QxdpKjt2' }),

    jsonRpcProvider({
      rpc: chain => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'LightLink',
  chains,
  // projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '3bc35b276cb4e1f1293b15bcebc4d9f9'
})

export const config = createConfig({
  autoConnect: true,
  // connectors: [
  //   new MetaMaskConnector({ chains })
  // ],
  connectors,
  publicClient,
  webSocketPublicClient
})

export { chains }
