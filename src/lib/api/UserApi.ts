import BaseAPI from './BaseApi';
import { SiweMessage } from 'siwe';

class UserAPI extends BaseAPI {
    async getAuthNonce() {
        return this.get('/api/v1/auth/nonce');
    }

    async signin(message: SiweMessage, signature: string) {
        const payload = {
            message,
            signature
        };
        return this.post('/api/v1/auth/signin', payload);
    }

    async logout() {
        return this.post('/api/v1/auth/logout');
    }

    async getProfile(token: any) {
        const path = `/api/v1/auth/profile?token=${encodeURIComponent(token)}`;
        return this.get(path);
    }

    async updateProfile(token: any, name?: string, bio?: string, twitter?: string, instagram?: string, discord?: string) {
        const path = `/api/v1/auth/profile?token=${encodeURIComponent(token)}`;
        const payload = {
            name, bio, twitter, instagram, discord, wallet_address: '0xde62C75255e6cd1EC7C5dAAFDEF1aC1ABaae1848'
        };
        return this.put(path, payload);
    }

    async updateProfileAvatar(token: any, imageData: File) {
        let formData = new FormData();
        formData.append('file', imageData);

        let path = `/api/v1/auth/avatar?token=${encodeURIComponent(token)}`;
        const resp = await this._instance.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return resp.data;
    }
}

export default UserAPI;
