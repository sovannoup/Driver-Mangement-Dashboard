import axiosInstance from './interceptors';

export async function fetchCMSCategories(payload) {
    const response = await axiosInstance.get('cms/categories', {
      params: payload
    }
    );
    return response.data;
}

export async function singleDeleteCMSCategories(id) {
  const response = await axiosInstance.delete(`cms/categories/${id}`);
  return response.data;
}

export async function multipleDeleteCMSCategories(ids) {
  const response = await axiosInstance.post(`cms/categories/multi-delete`, {ids});
  return response.data;
}

export async function fetchSingleCMSCategory(id) {
  const response = await axiosInstance.get(`cms/categories/${id}`);
  return response.data;
}

export async function editCMSCategory(form, id) {
  const response = await axiosInstance.put(`cms/categories/${id}`, form);
  return response.data;
}

export async function addCMSCategory(form) {
  const response = await axiosInstance.post(`cms/categories`, form);
  return response.data;
}
export async function statusChange(payload)
{
  let {id} = payload
  const res  = await axiosInstance.post(`cms/categories/${id}/change-status`,payload);
  return res.data;
}