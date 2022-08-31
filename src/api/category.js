import axiosInstance from './interceptors';
import store from '../store';
const resolveTypeOfCategoryRoute = () => {
    
    const userLoginType = store.getters["profile/user"].type;
    if (userLoginType === "store") {
        return "/categories"
    } else if ("admin") {
        return "/store-categories"
    }
}

export async function getlistCategories(payload) { 
    const response = await axiosInstance.get(`${resolveTypeOfCategoryRoute()}`, {
        params: payload
    }
    );
    return response.data;
}

export async function fetchStoreCategories(payload) {
    const response = await axiosInstance.get(`${resolveTypeOfCategoryRoute()}`, {
      params:  payload }
    );
    return response.data;
  }
  
  export async function singleDeleteStoreCategory(id) {
    const response = await axiosInstance.delete(`${resolveTypeOfCategoryRoute()}/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteStoreCategories(ids) {
    const response = await axiosInstance.post(`${resolveTypeOfCategoryRoute()}/multi-delete`, {ids});
    return response.data;
  }
  
  export async function addStoreCategory(form) {
    const response = await axiosInstance.post(`${resolveTypeOfCategoryRoute()}`, form);
    return response.data;
  }
  
  export async function fetchSingleStoreCategory(id) {
    const response = await axiosInstance.get(`${resolveTypeOfCategoryRoute()}/${id}`);
    return response.data;
  }
  
  export async function editStoreCategory(form, id) {
    const response = await axiosInstance.put(`${resolveTypeOfCategoryRoute()}/${id}`, form);
    return response.data;
  }
  
  