import axiosInstance from './interceptors';

export async function fetchCustomerGroup(sort, pageToGoTo, limit = 10) {
    const response = await axiosInstance.get('customers/groups', {
      params: { 
        sort: sort?.sort?.sortBy,
        direction: sort?.sort?.sortDirection,
        limit: limit,
        page: pageToGoTo
        }
      } 
    );
    return response.data;
}

export async function singleDeleteCustomerGroup(id) {
  const response = await axiosInstance.delete(`customers/groups/${id}`);
  return response.data;
}

export async function multipleDeleteCustomerGroup(ids) {
  const response = await axiosInstance.post(`customers/groups/multi-delete`, {ids});
  return response.data;
}


export async function fetchSingleCustomerGroup(id) {
  const response = await axiosInstance.get(`customers/groups/${id}`);
  return response.data;
}

export async function editCustomerGroup(form, id) {
  const response = await axiosInstance.put(`customers/groups/${id}`, form);
  return response.data;
}

export async function addCustomerGroup(form, id) {
  const response = await axiosInstance.post(`customers/groups`, form);
  return response.data;
}