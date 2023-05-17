import axios from 'axios'
const _instance = axios.create()
_instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_ROOT || 'http://llnft-federation-stage14.ap-southeast-1.elasticbeanstalk.com'
// _instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_ROOT
_instance.defaults.headers.post['Content-Type'] = 'application/json'
_instance.defaults.headers.post['Accept'] = 'application/json'

// { page_index, page_size, sort_by, order_by, terms, contract_address }
export async function searchNfts(filter) {
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
export async function searchCollections(filter) {
    let path = '/api/v1/collections'
    const params = []
    for (const [key, value] of Object.entries(filter)) {
        params.push(`${key}=${value}`)
    }
    path = path + '?' + params.join('&')

    const resp = await _instance.get(path)
    return resp.data
}

export async function getCollection(address) {
    let path = `/api/v1/collections/${address}`
    const resp = await _instance.get(path)
    return resp.data
}

export async function getNftDetail(address, tokenId) {
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

export async function fetchNftsByCollection(address) {
    let path = `/api/v1/collections`
    const payload = {
        address
    }
    try {
        const resp = await _instance.post(path, payload)
        return resp.data
    }
    catch (error) {
        console.log(error.message)
        throw new Error('Failed to fetch nfts');
    }
}

export async function refreshNftMetaData(address, tokenId) {
    let path = `/api/v1/collections/${address}/nfts/${tokenId}`
    const resp = await _instance.put(path)
    return resp.data
}

