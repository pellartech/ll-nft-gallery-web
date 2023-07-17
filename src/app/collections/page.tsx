"use client";
import CollectionsTable from "@/components/collections-table";
import Search from "@/components/search";
import { SelectFilter } from "@/components/select-filter";
import { CollectionGrid } from "@/modules";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="text-5xl text-white font-semibold mb-8">Browse Collections</div>
      <CollectionGrid params={{ address: "" }} searchParams={{ q: "" }} />
    </main>
  );
}
