import axiosInstance from './interceptors';

export async function getListCMSPage(payload) {
    const res = await axiosInstance.get(`cms/pages`,{params:payload});
    return res.data;
}
export async function addCMSPage(form ) {
    const res = await axiosInstance.post(`cms/pages`,form);
    return res.data;
}
export async function getSingleCMSPage(id)
{
    const res = await axiosInstance.get(`cms/pages/${id}`);
    return res.data;
}
export async function singleDelete(ids) {
    const res = await axiosInstance.delete(`cms/pages/${ids}`);
    return res.data;
}
export async function multipleDeletes(ids)
{
    const res  = await axiosInstance.post(`cms/pages/multi-delete` , {ids});
    return res.data;
}
export async function editCMSPage(form,id) {
    const res = await axiosInstance.put(`cms/pages/${id}`,form);
    return res.data;
}
export async function statusChange(payload)
{
  let {id} = payload
  const res  = await axiosInstance.post(`cms/pages/${id}/change-status`,payload);
  return res.data;
}