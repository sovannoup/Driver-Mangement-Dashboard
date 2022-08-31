import axiosInstance from './interceptors';

export async function fetchProducts(payload) {
    const response = await axiosInstance.get('products', {
      params: payload
    }
    );
    return response.data;
}

export async function singleDeleteProduct(id) {
  const response = await axiosInstance.delete(`products/${id}`);
  return response.data;
}

export async function multipleDeleteCustomer(ids) {
  const response = await axiosInstance.post(`products/multi-delete`, {ids});
  return response.data;
}


export async function fetchSingleProduct(id) {
  const response = await axiosInstance.get(`products/${id}`);
  return response.data;
}

export async function editProduct(form, id) {
  const response = await axiosInstance.put(`products/${id}`, form);
  return response.data;
}

export async function addProduct(form) {
  const response = await axiosInstance.post(`products`, form);
  return response.data;
}

export async function fetchPreOptions() {
  const response = await axiosInstance.get(`products/pre-options`);
  return response.data;
}

export async function statusChange(payload){
  let {id} = payload
  const res  = await axiosInstance.post(`products/${id}/change-status`,payload);
  return res.data;
}