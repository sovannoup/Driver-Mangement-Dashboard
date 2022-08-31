import axiosInstance from './interceptors';

export async function fetchCustomer(payload) {
    const response = await axiosInstance.get('customers', {
      params: payload
    }
    );
    return response.data;
}

export async function singleDeleteCustomer(id) {
  const response = await axiosInstance.delete(`customers/${id}`);
  return response.data;
}

export async function multipleDeleteCustomer(ids) {
  const response = await axiosInstance.post(`customers/multi-delete`, {ids});
  return response.data;
}


export async function fetchSingleCustomer(id) {
  const response = await axiosInstance.get(`customers/${id}`);
  return response.data;
}

export async function editCustomer(form, id) {
  const response = await axiosInstance.put(`customers/${id}`, form);
  return response.data;
}

export async function addCustomer(form) {
  const response = await axiosInstance.post(`customers`, form);
  return response.data;
}



export async function fetchCustomerTrashed(payload) {
  const response = await axiosInstance.get('customers/trashed', {
    params: payload
  }
  );
  return response.data;
}

export async function singleDeleteCustomerTrashed(id) {
  const response = await axiosInstance.post(`customers/trashed/${id}/delete`);
  return response.data;
}

export async function restoreCustomerTrashed(id) {
  const response = await axiosInstance.post(`customers/trashed/${id}/restore`);
  return response.data;
}



