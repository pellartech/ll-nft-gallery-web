import UserAPI from "@/lib/api/UserApi"
import Profile from "@/ui/pages/Profile"
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
  const userApi = new UserAPI()
  const address = params.address
  const res = await userApi.getProfile(address)
  return {
    title: `LL NFT | ${res?.user?.name || formatAccountDisplay(address)}`,
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