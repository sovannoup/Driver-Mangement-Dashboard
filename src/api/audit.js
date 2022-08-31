import axiosInstance from './interceptors';
import store from '../store';

const resolveTypeOfUser = () => {
  const userLoginType = store.getters["profile/user"].type;
  if (userLoginType === "store") {
      return "/users"
  } else if ("admin") {
      return "/admin-users"
  } 
}
export async function fetchAudit(payload) {
    return await axiosInstance.get( `audits`, 
    { params: payload} );
}
  export async function singleAudit(id) {
    const response = await axiosInstance.get(`audits/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteAudit(ids) {
    const response = await axiosInstance.post(`audits/multi-delete`, {ids});
    return response.data;
  }
  export async function fetchStoreCategories(sort, pageToGoTo, limit = 10) {
    const response = await axiosInstance.get(`${resolveTypeOfCategoryRoute()}`, {
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
  export async function fetchAuditType() {
    const response = await axiosInstance.get(`audits/type`);
    return response;
  }
  export async function fetchUsers(payload) { 
    const {
        sort, 
        page,
        limit,
        direction,
        search
    } 
     = payload
    const data= await axiosInstance.get(`${resolveTypeOfUser()}`, 
    { params: { 
      sort,
      page,
      limit,	
      direction,
      search
     }}); return data.data
  
  }
export async function getStores(payload) {
  const response = await axiosInstance.get('stores', {
      params: payload
  });
  return response.data;
}
