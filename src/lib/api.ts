import axios from 'axios'
import { SiweMessage } from 'siwe'
import { getCookie } from 'cookies-next'
const _instance = axios.create()
_instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_ROOT || 'https://gallery-federation.lightlinksys.com'
// _instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_ROOT
_instance.defaults.headers.post['Content-Type'] = 'application/json'
_instance.defaults.headers.post['Accept'] = 'application/json'

// { page_index, page_size, sort_by, order_by, terms, contract_address }
export async function searchNfts(filter: any) {
    let path = '/api/v1/nfts'
    const params = []
    for (const [key, value] of Object.entries(filter)) {
        params.push(`${key}=${value}`)
    }
    path = path + '?' + params.join('&')

    const resp = await _instance.get(path)
    return resp.data
}

// { page_index, page_size, sort_by, order_by, terms, contract_address,include_all,limit }
export async function searchCollections(filter: any) {
    let path = '/api/v1/collections'
    const params = []
    for (const [key, value] of Object.entries(filter)) {
        params.push(`${key}=${value}`)
    }
    path = path + '?' + params.join('&')

    const resp = await _instance.get(path)
    return resp.data
}

export async function getCollection(address: string) {
    let path = `/api/v1/collections/${address}`
    const resp = await _instance.get(path)
    return resp.data
}

export async function getNftDetail(address: string, tokenId: string) {
    let path = `/api/v1/collections/${address}/nfts/${tokenId}`
    try {
        const resp = await _instance.get(path)
        return resp.data
    }
    catch (error) {
        console.log(error)
        throw new Error('Failed to fetch data');
    }
}

export async function fetchNftsByCollection(address: string) {
    let path = `/api/v1/collections`
    const payload = {
        address
    }
    try {
        const resp = await _instance.post(path, payload)
        return resp.data
    }
    catch (error) {
        // console.log(error.message)
        throw new Error('Failed to fetch nfts');
    }
}

export async function refreshNftMetaData(address: string, tokenId: string) {
    let path = `/api/v1/collections/${address}/nfts/${tokenId}`
    const resp = await _instance.put(path)
    return resp.data
}

export async function getAuthNonce() {
    let path = `/api/v1/auth/nonce`
    const payload = {
    }
    const resp = await _instance.get(path, payload)
    return resp.data
}

export async function signin(message: SiweMessage, signature: string) {
    let path = `/api/v1/auth/signin`
    const payload = {
        // address,
        message,
        signature
    }
    const resp = await _instance.post(path, payload)
    return resp.data
}

export async function logout() {
    let path = `/api/v1/auth/logout`
    const resp = await _instance.post(path)
    return resp.data
}

export async function getProfile(token: any) {
    let path = `/api/v1/auth/profile`
    const resp = await _instance.get(path, {
        headers: {
            Authorization: `Bearer ${encodeURIComponent(token)}`,
        }
    })
    return resp.data
}

export async function updateProfile(token: any, name?: string, bio?: string, twitter?: string, instagram?: string, discord?: string) {
    let path = `/api/v1/auth/profile`
    const resp = await _instance.put(path, {
        name, bio, twitter, instagram, discord
    }, {
        headers: {
            Authorization: `Bearer ${encodeURIComponent(token)}`,
        }
    })
    return resp.data
}


