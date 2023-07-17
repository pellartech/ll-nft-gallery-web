import BaseAPI from './BaseApi';

class CollectionAPI extends BaseAPI {
    async searchCollections(filter: any) {
        let path = '/api/v1/collections' + this.buildParams(filter);
        return this.get(path);
    }

    async getCollection(address: string) {
        let path = `/api/v1/collections/${address}`;
        return this.get(path);
    }

    async updateCollection(contract_address: string, name: string, description: string, website: string, twitter: string, instagram: string, discord: string, logo?: any, background?: any) {
        let path = `/api/v1/collections/${contract_address}`;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("website", website);
        formData.append("twitter", twitter);
        formData.append("instagram", instagram);
        formData.append("discord", discord);
        if (logo) {
            formData.append("logo", logo);
        }
        if (background) {
            formData.append("background", background);
        }
        const resp = await this._instance.put(path, formData);
        return resp.data;
    }
}

export default CollectionAPI;
