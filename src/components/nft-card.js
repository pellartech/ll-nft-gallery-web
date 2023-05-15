export const NFTCard = ({ nft }) => {

    return (
        <div key={nft.key} className="w-1/4 flex flex-col ">
            <div className="rounded-md">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.original_image_uri} ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.name}</h2>
                    <p className="text-gray-600">Id: {nft.token_id}</p>
                    <p className="text-gray-600" >{nft.contract_address}</p>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-gray-600">{nft.description}</p>
                </div>
            </div>

        </div>
    )
}