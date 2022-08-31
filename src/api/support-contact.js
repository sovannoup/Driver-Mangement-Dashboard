import axiosInstance from  "./interceptors";

export async function fetchSupport(payload){ 
    const res = await axiosInstance.get(`supportcontacts`,{
        params: payload
    });
    return res.data;
 }

export async function fetchSingleSupportCustomer(id) {
  const response = await axiosInstance.get(`supportcontacts/${id}`);
  return response.data;
}

export async function editSupportCustomer(form, id) {
  const response = await axiosInstance.put(`supportcontacts/${id}`, form);
  return response.data;
}

export async function addSupportCustomer(form) {
  const response = await axiosInstance.post(`supportcontacts`, form);
  return response.data;
}
export async function singleDeleteSupportCustomer(id)
{
    const response = await axiosInstance.delete(`supportcontacts/${id}`);
    return response.data;
}
