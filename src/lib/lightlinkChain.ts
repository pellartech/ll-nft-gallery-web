import { Chain } from 'wagmi'

export const lightlinkChain: Chain = {
  id: 1891,
  name: 'LightLink',
  network: 'pegasus',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://replicator-01.pegasus.lightlink.io/rpc/v1'] },
    public: { http: ['https://replicator-01.pegasus.lightlink.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://pegasus.lightlink.io' },
    etherscan: { name: 'SnowTrace', url: 'https://pegasus.lightlink.io' },
  },
}