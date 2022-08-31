import axiosInstance from "./interceptors";

export async function getAnnouncement(payload) {
    const res  = axiosInstance.get(`announcements`, {
        params:payload
    });
    return (await res).data;
}
export async function addAnnouncement(form) {
    const res  =  await axiosInstance.post(`announcements`,form);
    return res.data;
}
export async function editAnnouncement(form , id) {
    const res = await axiosInstance.put(`announcements/${id}`, form);
    return res.data;
}
export async function getSingleAnnouncement(id) {
    const res = await axiosInstance.get(`announcements/${id}`);
    return res.data;
}
export async function singleDelete(id) {
    const res  = await axiosInstance.delete(`announcements/${id}`);
    return res.data;
}
export async  function multipleDelete(ids) {
    const res = await axiosInstance.post(`announcements/multi-delete/`,{ids});
    return res.data;
}