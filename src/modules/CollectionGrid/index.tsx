"use client"
import CollectionsTable from "@/components/collections-table";
import Search from "@/components/search";
import { SelectFilter } from "@/components/select-filter";
import { searchCollections } from "@/lib/api";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { CollectionFilter } from "./components";

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

const CollectionGrid = ({
    params,
    searchParams,
}: {
    params: { address: string };
    searchParams: { q: string };
}) => {
    const search = searchParams.q ?? "";
    const [filterOpen, setFilterOpen] = useState(false)
    const [collectionsData, setCollectionsData] = useState<any>();
    const [selectFilterCollection, setSelectFilterCollection] = useState(
        filterCollection[0]
    );
    const [filter, setFilter] = useState({
        terms: search,
        page_index: 1,
        page_size: 20,
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

    const handlePageChange = (pageIndex: number) => {
        setFilter({
            ...filter,
            page_index: pageIndex + 1,
        });
    };

    return (
        <main className=" mx-auto max-w-7xl">
            <div className="flex gap-2">
                <CollectionFilter isOpen={filterOpen} toggleOpen={() => setFilterOpen(!filterOpen)} />

                <div className="flex flex-grow flex-col">
                    <div className="flex justify-start w-full gap-2">
                        <div className="flex-grow">
                            <Search type="nft" />
                        </div>
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

                    {collectionsData && <CollectionsTable cols={filterOpen ? 4 : 5} items={collectionsData?.items} />}
                </div>
            </div>

            {collectionsData?.total_pages > 1 && (
                <ReactPaginate
                    className="react-pagination"
                    breakLabel="..."
                    nextLabel=">"
                    pageCount={collectionsData?.total_pages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    onPageChange={({ selected }) => {
                        handlePageChange(selected);
                    }}
                />
            )}
        </main>

    );
}

export default CollectionGrid