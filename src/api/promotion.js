import axiosInstance from './interceptors';

export async function fetchPromotion(payload) {
    const response = await axiosInstance.get('promotions', {
      params: payload
    }
    );
    return response.data;
}
export async function multipleDeletePromotion(ids) {
    const response = await axiosInstance.post(`promotions/multi-delete`, {ids});
    return response.data;
  }
export async function fetchSinglePromotion(id) {
    const response = await axiosInstance.get(`promotions/${id}`);
    return response.data;
  }
  
  export async function editPromotion(form, id) {
    const response = await axiosInstance.put(`promotions/${id}`, form);
    return response.data;
  }
  
  export async function addPromotion(form) {
    const response = await axiosInstance.post(`promotions`, form);
    return response.data;
  }
  export async function singleDeletePromotion(id) {
    const response = await axiosInstance.delete(`promotions/${id}`);
    return response.data;
  }
  
  export async function statusChange(payload){
    let {id} = payload
    const res  = await axiosInstance.post(`promotions/${id}/change-status`,payload);
    return res.data;
  }