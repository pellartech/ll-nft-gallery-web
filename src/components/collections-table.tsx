import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
  Text,
} from "@tremor/react";
import Link from "next/link";
import { Collection } from "@/interfaces/ICollection";
import { CollectionCard } from "./collection-card";

export default function CollectionsTable({ items }: { items: Collection[] }) {
  return (
    <div className="flex flex-wrap gap-5 mt-8">
      {items.map((item: Collection) => (
        <CollectionCard item={item} />
      ))}
    </div>
  );
}
