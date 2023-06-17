// 'use client'
import CollectionsTable from "@/components/collections-table";
import Search from "@/components/search";
import { searchCollections } from "@/lib/api";

import { Card, Title, Text } from "@tremor/react";

// export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const collectionsData = await searchCollections({
    terms: search,
    page_index: 1,
    page_size: 20,
    sort_by: "total_supply",
    order_by: "desc",
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="text-5xl text-white font-semibold mb-8">Collections</div>
      <div className="flex gap-5">
        <div className="flex items-center gap-2 rounded-[10px] p-4 h-[52px] bg-dark-90 text-white font-semibold">
          <img src="/images/icons/filter.svg" alt="Filter" />
          Filter
        </div>
        <Search type="collection" />
      </div>
      {/* <Card className="mt-6"> */}
      <CollectionsTable items={collectionsData.items} />
      {/* </Card> */}
    </main>
  );
}
