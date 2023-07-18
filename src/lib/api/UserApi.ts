import { IUser } from '@/interfaces/IUser';
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

    async getProfile(address: string) {
        const path = `/api/v1/users/${address}`;
        return this.get(path);
    }

    async updateProfile(user: IUser) {
        const path = `/api/v1/auth/profile?`;
        return this.put(path, user);
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
