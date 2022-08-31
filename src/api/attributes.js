import axiosInstance from './interceptors';

export async function fetchAttributeGroups(sort, pageToGoTo, limit) {
    const response = await axiosInstance.get('attributes/groups', {
      params: { 
        sort: sort?.sort?.sortBy,
        direction: sort?.sort?.sortDirection,
        limit: limit ? limit : 10,
        page: pageToGoTo
      }
    } );
    return response.data;
  }
  
  export async function fetchSingleAttributeGroup(id) {
    const response = await axiosInstance.get(`attributes/groups/${id}`);
    return response.data;
  }
  
  export async function singleDeleteAttributeGroup(id) {
    const response = await axiosInstance.delete(`attributes/groups/${id}`);
    return response.data;
  }
  
  export async function addAttributeGroup({attributeGroupName, sortOrder }) {
    const response = await axiosInstance.post(`attributes/groups`, {name: attributeGroupName, sort_order: sortOrder});
    return response.data;
  }
  
  export async function editAttributeGroup({attributeGroupName, sortOrder}, id) {
    const response = await axiosInstance.put(`attributes/groups/${id}`, {name: attributeGroupName, sort_order: sortOrder});
    return response.data;
  }
  
  export async function multipleDeleteAttributeGroup(ids) {
    const response = await axiosInstance.post(`/attributes/groups/multi-delete`, {ids});
    return response.data;
  }
  
export async function fetchAttributes(sort, pageToGoTo) {
    const response = await axiosInstance.get('attributes', {
      params: { 
        sort: sort?.sort?.sortBy,
        direction: sort?.sort?.sortDirection,
        limit: 10,
        page: pageToGoTo
        }
      } 
    );
    return response.data;
  }
  
  export async function singleDeleteAttribute(id) {
    const response = await axiosInstance.delete(`attributes/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteAttribute(ids) {
    const response = await axiosInstance.post(`/attributes/multi-delete`, {ids});
    return response.data;
  }
  
  export async function addAttribute({name, sortOrder, groupAttribute }) {
    const response = await axiosInstance.post(`/attributes`, {name: name, sort_order: sortOrder, group: groupAttribute});
    return response.data;
  }
  
  export async function editAttribute({name, sortOrder, groupAttribute}, id) {
    const response = await axiosInstance.put(`attributes/${id}`, {name: name, sort_order: sortOrder, group: groupAttribute});
    return response.data;
  }
  
  export async function fetchSingleAttribute(id) {
    const response = await axiosInstance.get(`attributes/${id}`);
    return response.data;
  }