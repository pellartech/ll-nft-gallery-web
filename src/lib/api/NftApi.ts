import BaseAPI from './BaseApi';

class NftAPI extends BaseAPI {
    async searchNfts(filter: any) {
        let path = '/api/v1/nfts' + this.buildParams({address: '0xC302914e6A8d861Af24e25B460fa19BA90D1C5c5', ...filter});
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

    async queryNfts(address: string) {
        let path = `/api/v1/nfts?contract_address=${address}`;
        return this.get(path)
    }
}

export default NftAPI;
