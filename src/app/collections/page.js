import { CollectionCard } from "@/components/collection-card"
import { searchCollections } from "@/lib/api"

export default async function Page() {
  const collectionsData = await searchCollections({ page_index: 1, page_size: 30, sort_by: 'modified', order_by: 'total_supply' })

  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Collections
        </h2>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
        {
          collectionsData.items.map((item) => {
            return (
              <CollectionCard item={item} key={item.key}></CollectionCard>
            )
          })
        }
      </ul>
    </div>
  )
}