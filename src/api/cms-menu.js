import axiosInstance from './interceptors';
export async function fetchCMSMenu(payload) {
    const response = await axiosInstance.get('cms/menus',
     {params: payload });
    return response.data;
  }
  export async function fetchCMSMenuCategory(payload) {
    const res = await axiosInstance.get( `categories`, 
    { params: payload} );
    return res.data;
  }
  export async function fetchCMSMenuPostCategory(payload) {
    const res = await axiosInstance.get( `cms/categories`, 
    { params: payload} );
    return res.data;
  }
  export async function fetchCMSMenuPage(payload) {
    const res =  await axiosInstance.get( `cms/pages`, 
    { params: payload} );
    return res.data;
  }
  export async function singleDeleteCMSMenus(id) {
    const response = await axiosInstance.delete(`cms/menus/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteCMSMenus(ids) {
    const response = await axiosInstance.post(`cms/menus/multi-delete`, {ids});
    return response.data;
  }

  export async function addCMSMenu(form ,id) {
    Object.keys(form).map((key) => {
      if(form[key] == null){
        delete form[key]
      }
    });
    
    const response = await axiosInstance.post(`cms/menus`, form); 
    return response.data;
  }
  export async function fetchSingleCMSMenu(id) {
    const response = await axiosInstance.get(`cms/menus/${id}`);
    return response.data;
  }
  export async function editCMSMenu(form, id) {
    
    Object.keys(form).map((key) => {
      if(form[key] == null){
        delete form[key]
      }
    });
    
    const response = await axiosInstance.put(`cms/menus/${id}`, form);
    return response.data;
  }
  export async function editCMSStatus(Status, id) {
    // console.log(Status);
    // 
    const response = await axiosInstance.put(`cms/menus/${id}`, 
    {
      status:Status
    });
    return response.data;
  }
  export async function getById(id){
    return await axiosInstance.get(`cms/menus/${id}`)
  }
  export async function statusChange(payload)
  {
    let {id} = payload
    const res  = await axiosInstance.post(`cms/menus/${id}/change-status`,payload);
    return res.data;
  }
  