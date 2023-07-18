import CollectionAPI from "@/lib/api/CollectionApi";
import { CollectionPage } from "@/ui/pages";
import { formatAccountDisplay } from "@/utils/utils"
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { address: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const collectionApi = new CollectionAPI()
  const address = params.address
  const data = await collectionApi.getCollection(address);
 
  return {
    title: `LL NFT | ${data?.name}`,
  }
}

export default async function Page({ params }: { params: { address: string } }) {
  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <CollectionPage address={params.address} />
      </main>
    </>
  )
}
