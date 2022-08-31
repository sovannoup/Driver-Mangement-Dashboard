import axiosInstance from './interceptors';

export async function fetchManufactures(payload) {
    const response = await axiosInstance.get('manufactures', { params: payload} );
    return response.data;
  }
  
  export async function singleDeleteManufacture(id) {
    const response = await axiosInstance.delete(`manufactures/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteManufactures(ids) {
    const response = await axiosInstance.post(`/manufactures/multi-delete`, {ids});
    return response.data;
  }
  
  export async function addManufacture(form) {
    const response = await axiosInstance.post(`manufactures`, form);
    return response.data;
  }
  
  export async function fetchSingleManufacture(id) {
    const response = await axiosInstance.get(`manufactures/${id}`);
    return response.data;
  }
  
  export async function editManufacture(form, id) {
    const response = await axiosInstance.put(`manufactures/${id}`, form);
    return response.data;
  }
  
  
  