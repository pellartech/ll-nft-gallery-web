import Link from 'next/link'

export const NFTCard = ({ item }) => {

    return (
        <Link key={item.key} as={`/collections/${item.contract_address}/tokens/${item.token_id}`}
            href="/collections/[address]/tokens/[id]">
            <div key={item.key} className="w-1/4 flex flex-col ">
                <div className="rounded-md">
                    <img className="object-cover h-128 w-full rounded-t-md" src={item.original_image_uri} ></img>
                </div>
                <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                    <div className="">
                        <h2 className="text-xl text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">Id: {item.token_id}</p>
                        <p className="text-gray-600" >{item.contract_address}</p>
                    </div>

                    <div className="flex-grow mt-2">
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                </div>

            </div>
        </Link>
    )
}