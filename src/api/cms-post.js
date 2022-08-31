import axiosInstance from "./interceptors";
export async function fetchCMSPost(payload) {
    const res = await axiosInstance.get(`cms/posts`,
    {
        params:payload
    });
    return res.data;
}
export async function addCMSPost(form) {
    const res = await axiosInstance.post(`cms/posts`,form);
    return res.data;
}
export async function getSingleCMSPost(id)
{
    const res = await axiosInstance.get(`cms/posts/${id}`);
    return res.data;
}
export async function singleDelete(ids) {
    const res = await axiosInstance.delete(`cms/posts/${ids}`);
    return res.data;
}
export async function multipleDeletes(ids)
{
    const res  = await axiosInstance.post(`cms/posts/multi-delete` , {ids});
    return res.data;
}
export async function editCMSPost(form,id) {
    const res = await axiosInstance.put(`cms/posts/${id}`,form);
    return res.data;
}
export async function fetchCMSCategories(payload) {
    const response = await axiosInstance.get('cms/categories', {
      params: payload
    }
    );
    return response.data;
}
export async function fetchCMSPostRelated(payload)
{
    const res =await axiosInstance.get(`cms/posts`, {
        params: payload
    });
    return res.data;
}
export async function addTags(name) {
    const res  =await axiosInstance.post(`cms/post-tags`,{
        name:name
    });
    return res.data;
}
export async function getTags(payload) {
    const res  =await axiosInstance.get(`cms/post-tags`,{
        params:payload
    });
    return res.data;
}
export async function statusChange(payload)
{
  let {id} = payload
  const res  = await axiosInstance.post(`cms/posts/${id}/change-status`,payload);
  return res.data;
}