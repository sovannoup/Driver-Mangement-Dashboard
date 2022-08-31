import axiosInstance from './interceptors';

export async function getStores(payload) {
    const response = await axiosInstance.get('stores', {
        params: payload
    });
    return response.data;
}

export async function addStore(payload) {
    console.log(payload)
    const response = await axiosInstance.post('stores',payload);
    return response.data;
}

export async function updateStore(payload, id) { 
    const response = await axiosInstance.put(`stores/${id}` , payload);
    return response.data;
}
 
export async function showStore(id) { 
    const response = await axiosInstance.get(`stores/${id}`); 
    return response.data;
}

export async function updateStatusStore(payload) { 
    let {id} = payload
    const response = await axiosInstance.post(`stores/${id}/change-status`, payload); 
    return response.data;
}

export async function removeStore(payload) { 
    let {id} = payload
    const response = await axiosInstance.post(`stores/${id}/change-status`, payload); 
    return response.data;
}

