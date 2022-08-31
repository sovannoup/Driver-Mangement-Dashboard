import axiosInstance from './interceptors';
export async function fetchCMSBanner(payload) {
    const response = await axiosInstance.get('cms/banners', {
      params: payload
      } 
    );
    return response.data;
  }
  export async function fetchCMSBannerPage(payload) {
    const res  = await axiosInstance.get( `cms/pages`, 
    { params: payload} );
    return res.data;
  }
  export async function singleDeleteCMSBanners(id) {
    const response = await axiosInstance.delete(`cms/banners/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteCMSBanners(ids) {
    const response = await axiosInstance.post(`cms/banners/multi-delete`, {ids});
    return response.data;
  }

  export async function addCMSBanner(form ,id) {
    Object.keys(form).map((key) => {
      if(form[key] == null){
        delete form[key]
      }
    });
    
    const response = await axiosInstance.post(`cms/banners`, form); 
    return response.data;
  }
  export async function editCMSBanner(form, id) {
    
    Object.keys(form).map((key) => {
      if(form[key] == null){
        delete form[key]
      }
    });
    const response = await axiosInstance.put(`cms/banners/${id}`, form);
    return response.data;
  }
  export async function fetchSingleCMSBanner(id){
    const res  = await axiosInstance.get(`cms/banners/${id}`);
    return res.data;
  }
export async function statusChange(payload)
{
  let {id} = payload
  const res  = await axiosInstance.post(`cms/banners/${id}/change-status`,payload);
  return res.data;
}
