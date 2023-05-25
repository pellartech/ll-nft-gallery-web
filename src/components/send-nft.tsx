'use client'

import { useState } from 'react'
import { useTransition } from 'react'
import {
    erc721ABI,
    usePrepareSendTransaction,
    useSendTransaction,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractWrite
} from 'wagmi'
import { useDebounce } from 'use-debounce'
import { BaseError } from 'viem'


// const abi = [
//     "function safeMint(address recipient, string tokenUri) public",
// ]
export function SendNFT({ contract, owner, tokenId }: { contract: string, owner: string, tokenId: string }) {
    const [to, setTo] = useState('')
    const debouncedTokenId = useDebounce(tokenId, 500)
    const [debouncedFrom] = useDebounce(owner, 500)
    const [debouncedTo] = useDebounce(to, 500)

    const { config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        // address: '0xe90079c6826e3def45a3a3f2bbe5e169a0ae9019',
        address: contract as `0x${string}`,
        abi: [
            {
                name: 'safeTransferFrom',
                type: 'function',
                stateMutability: 'nonpayable',
                inputs: [
                    { name: 'from', type: 'address' },
                    { name: 'to', type: 'address' },
                    { name: 'tokenId', type: 'uint256' },
                ],
                outputs: [],
            },
        ],
        // abi: erc721ABI,
        functionName: 'safeTransferFrom',
        // args: ['0x4566ED6c7a7fFc90E2C7cfF7eB9156262afD2fDe', '0x640a6D5A3f155A8F0636a0396B18Ba5eEdfab440', parseInt(0)],
        args: [debouncedFrom as `0x${string}`, debouncedTo as `0x${string}`, BigInt(parseInt(debouncedTokenId))],
        enabled: Boolean(debouncedFrom) && Boolean(debouncedTo) && Boolean(debouncedTokenId),
    })
    const { data, error, isError, write, isLoading } = useContractWrite(config)

    const { isLoading: isPending, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleSendNft = () => {
        write?.()
    }

    return (
        <div>
            <input
                placeholder="address"
                onChange={(e) => setTo(e.target.value)}
                value={to}
            />
            <button
                disabled={!write || isLoading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleSendNft()}>
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            {isLoading && <div>Check wallet...</div>}
            {isPending && <div>Transaction pending...</div>}
            {isSuccess && (
                <div>
                    Successfully sent your NFT!
                    <div>
                        <a href={`https://pegasus.lightlink.io/tx/${data?.hash}`}>Lightlink</a>
                    </div>
                </div>
            )}
            {isError && <div>{(error as BaseError)?.shortMessage}</div>}
        </div>
    );
}
