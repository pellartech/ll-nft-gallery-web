"use client";
import CollectionsTable from "@/components/collections-table";
import Search from "@/components/search";
import { SelectFilter } from "@/components/select-filter";
import { searchCollections } from "@/lib/api";

import { Card, Title, Text } from "@tremor/react";
import Image from "next/image";
import { useEffect, useState } from "react";

// export const dynamic = 'force-dynamic'
const filterCollection = [
  { value: "desc_created", label: "Newest", type: "created" },
  { value: "asc_created", label: "Oldest", type: "created" },
  {
    value: "desc_total_supply",
    label: "Total Supply Decrease",
    type: "total_supply",
  },
  {
    value: "asc_total_supply",
    label: "Total Supply Increased",
    type: "total_supply",
  },
];

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const [collectionsData, setCollectionsData] = useState<any>();
  const [selectFilterCollection, setSelectFilterCollection] = useState(
    filterCollection[0]
  );
  const [filter, setFilter] = useState({
    terms: search,
    page_index: 1,
    page_size: 40,
    sort_by: "created",
    order_by: "desc",
  });

  useEffect(() => {
    setFilter({ ...filter, terms: search });
  }, [search]);

  useEffect(() => {
    getDataCollections();
  }, [filter]);

  const getDataCollections = async () => {
    const data = await searchCollections(filter);
    setCollectionsData(data);
  };

  useEffect(() => {
    if (selectFilterCollection.value === "desc_created") {
      setFilter({ ...filter, sort_by: "created", order_by: "desc" });
    }
    if (selectFilterCollection.value === "asc_created") {
      setFilter({ ...filter, sort_by: "created", order_by: "asc" });
    }
    if (selectFilterCollection.value === "desc_total_supply") {
      setFilter({ ...filter, sort_by: "total_supply", order_by: "desc" });
    }
    if (selectFilterCollection.value === "asc_total_supply") {
      setFilter({ ...filter, sort_by: "total_supply", order_by: "asc" });
    }
  }, [selectFilterCollection]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="text-5xl text-white font-semibold mb-8">Collections</div>
      <div className="flex gap-5">
        {/* <div className="flex items-center gap-2 rounded-[10px] p-4 h-[52px] bg-dark-90 text-white font-semibold">
          <img src="/images/icons/filter.svg" alt="Filter" />
          Filter
        </div> */}
        <Search type="collection" />
        <div className="w-[200px]">
          <SelectFilter
            options={filterCollection}
            selectedOption={selectFilterCollection}
            onSelectedOption={(selected: any) =>
              setSelectFilterCollection(selected)
            }
          />
        </div>
      </div>
      {collectionsData && <CollectionsTable items={collectionsData?.items} />}
    </main>
  );
}
