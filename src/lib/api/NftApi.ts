import BaseAPI from './BaseApi';

class NftAPI extends BaseAPI {
    async searchNfts(filter: any) {
        let path = '/api/v1/nfts' + this.buildParams(filter);
        return this.get(path);
    }

    async getNftDetail(address: string, tokenId: string) {
        let path = `/api/v1/collections/${address}/nfts/${tokenId}`;
        try {
            return this.get(path);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch data');
        }
    }

    async fetchNftsByCollection(address: string) {
        let path = `/api/v1/collections`;
        const payload = { address };
        try {
            return this.post(path, payload);
        } catch (error) {
            throw new Error('Failed to fetch nfts');
        }
    }

    async refreshNftMetaData(address: string, tokenId: string) {
        let path = `/api/v1/collections/${address}/nfts/${tokenId}`;
        return this.put(path);
    }
}

export default NftAPI;
