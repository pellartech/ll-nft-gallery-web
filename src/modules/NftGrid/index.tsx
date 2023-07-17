"use client";
import { NFTsCard } from "@/components/nfts-card";
import Search from "@/components/search";
import { SelectFilter } from "@/components/select-filter";
import { useEffect, useState } from "react";
import CollectionApi from "@/lib/api/CollectionApi"
import NftApi from "@/lib/api/NftApi"
import ReactPaginate from "react-paginate";
import { CollectionFilter } from "./components";

const filterNFT = [
    { value: "desc_created", label: "Newest", type: "created" },
    { value: "asc_created", label: "Oldest", type: "created" },
];

const NftGrid = ({
    params,
    searchParams,
}: {
    params: { address: string };
    searchParams: { q: string };
}) => {
    const collectionApi = new CollectionApi()
    const nftApi = new NftApi()
    const search = searchParams.q ?? "";
    const contract_address = params.address;
    const [filterOpen, setFilterOpen] = useState(false)

    const [selectFilterNFT, setSelectFilterNFT] = useState(filterNFT[0]);
    const [collection, setCollection] = useState<any>();
    const [nftsData, setNftsData] = useState<any>();
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
        getDataNfts();
    }, [filter]);

    const getDataNfts = async () => {
        const data = await nftApi.searchNfts(filter);
        setNftsData(data);
    };

    const getDataCollection = async () => {
        const data = await collectionApi.getCollection(contract_address);
        setCollection(data);
    };

    useEffect(() => {
        getDataCollection();
    }, [contract_address]);

    useEffect(() => {
        if (selectFilterNFT.value === "desc_created") {
            setFilter({ ...filter, sort_by: "created", order_by: "desc" });
        }
        if (selectFilterNFT.value === "asc_created") {
            setFilter({ ...filter, sort_by: "created", order_by: "asc" });
        }
    }, [selectFilterNFT]);

    const handlePageChange = (pageIndex: number) => {
        setFilter({
            ...filter,
            page_index: pageIndex + 1,
        });
    };

    if (!collection || !nftsData) {
        return (
            <main className="p-4 md:p-10 mx-auto max-w-7xl">
                <div>Loading...</div>
            </main>
        );
    }

    return (
        <main className="">
            <div className="mx-auto max-w-7xl">
                <div className="flex gap-2">
                    <CollectionFilter isOpen={filterOpen} toggleOpen={() => setFilterOpen(!filterOpen)} />

                    <div className="flex flex-grow flex-col">
                        <div className="flex justify-start w-full gap-2">
                            <div className="flex-grow">
                                <Search type="nft" />
                            </div>
                            <div className="w-[200px]">
                                <SelectFilter
                                    options={filterNFT}
                                    selectedOption={selectFilterNFT}
                                    onSelectedOption={(selected: any) => setSelectFilterNFT(selected)}
                                />
                            </div>
                        </div>

                        <NFTsCard items={nftsData.items} cols={filterOpen ? 4 : 5} />
                    </div>
                </div>

                {nftsData?.total_pages > 1 && (
                    <ReactPaginate
                        className="react-pagination"
                        breakLabel="..."
                        nextLabel=">"
                        pageCount={nftsData?.total_pages}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        onPageChange={({ selected }) => {
                            handlePageChange(selected);
                        }}
                    />
                )}
            </div>
        </main>
    );
}

export default NftGrid