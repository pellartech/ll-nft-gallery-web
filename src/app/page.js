
import FeaturedCollections from "@/components/pages/featured-collections";
import FetchNftsByCollection from "@/components/pages/fetch-nft-by-collection";
import RecentNfts from "@/components/pages/recent-nfts";

export default async function Page() {
    return (
        <>
            <FetchNftsByCollection />
            <FeaturedCollections />
            <RecentNfts />
        </>
    )
}
