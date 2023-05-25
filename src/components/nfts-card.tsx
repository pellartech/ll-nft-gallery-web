import Link from 'next/link'
import { NFT } from '@/interfaces/INFT'

export const NFTsCard = ({ items }: { items: NFT[] }) => {

    return (
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
            {
                items.map((item) =>
                (
                    <div key={item.key} className="w-1/4 flex flex-col ">
                        <Link key={item.key} as={`/collections/${item.contract_address}/tokens/${item.token_id}`}
                            href="/collections/[address]/tokens/[id]">
                            <div className="rounded-md">
                                <img className="object-cover h-128 w-128 rounded-t-md" src={`${process.env.NEXT_PUBLIC_S3_BASEURL}/${item.image && item.image.normal}`} ></img>
                            </div>
                            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                                <div className="">
                                    <h2 className="text-xl text-gray-800">{item.name}</h2>
                                    <p className="text-gray-600">Id: {item.token_id}</p>
                                    <p className="text-gray-600" >Owner:{item.owner_address}</p>
                                </div>
                            </div>
                        </Link>
                    </div >
                )
                )
            }
        </div >
    )
}