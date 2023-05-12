import { searchCollections } from "@/lib/api"

export default async function FeaturedCollections() {
    const collectionsData = await searchCollections({ page_index: 1, page_size: 10, sort_by: 'desc', order_by: 'total_supply' })
    return (
        <div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Featured Collections
                </h2>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {collectionsData.items.map((item) => (
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
                ))}
            </ul>
        </div>
    )
}