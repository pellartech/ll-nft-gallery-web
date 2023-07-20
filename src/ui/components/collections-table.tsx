
import { Collection } from "@/interfaces/ICollection";
import { CollectionCard } from "./collection-card";

export default function CollectionsTable({ items, cols = 5 }: { items: Collection[], cols?: number }) {
  return (
    <div className={`grid grid-cols-${cols} gap-5 mt-8`}>
    {items.map((item, index: number) => (
      <div key={index} className=" flex flex-wrap">
        <CollectionCard item={item} key={index} />
      </div>
    ))}
  </div>
  );
}