import { Profile } from "@/ui/modules"
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
  const fetchURL = `${process.env.NEXT_PUBLIC_API_URL_ROOT}/api/v1/users/${address}`
  const res = await fetch(fetchURL)
  const data = await res.json()
 
  return {
    title: `LL NFT | ${data?.user?.name || formatAccountDisplay(address)}`,
  }
}

export default async function Page({ params }: { params: { address: string } }) {
  return (
    <>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Profile address={params.address} />
      </main>
    </>
  )
}