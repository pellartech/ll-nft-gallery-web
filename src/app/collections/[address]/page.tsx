import { getCollection } from "@/lib/api"
import { Profile } from "@/modules"
import Collection from "@/modules/Collection"
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
  const address = params.address
  const data = await getCollection(address);
 
  return {
    title: `LL NFT | ${data?.name || formatAccountDisplay(address)}`,
  }
}

export default async function Page({ params }: { params: { address: string } }) {
  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Collection address={params.address} />
      </main>
    </>
  )
}
