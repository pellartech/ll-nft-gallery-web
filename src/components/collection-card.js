import Link from 'next/link'

export const CollectionCard = ({ item }) => {
    return (
        <Link key={item.key} as={`/collections/${item.contract_address}`} href="/collections/[address]">
            <li key={item.key} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.contract_address}</p>
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{item.symbol}</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        <time dateTime={item.created}>{item.created}</time>
                    </p>
                </div>
            </li>
        </Link>
    )
}