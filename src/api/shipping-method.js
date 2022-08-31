import axiosInstance from './interceptors';

export async function fetchShippings() {
    const response = await axiosInstance.get('shippings');
    return response.data;
  }
  
  export async function singleDeleteShipping(id) {
    const response = await axiosInstance.delete(`shippings/${id}`);
    return response.data;
  }
  
  
  export async function addShippingMethod({name, sortOrder, status, shortDescription, cost, region, country }) {
    const response = await axiosInstance.post(`shippings`, {
      name: name, 
      sort_order: sortOrder, 
      status: JSON.parse(status),
      description: shortDescription,
      cost,
      region,
      country
    });
    return response.data;
  }
  
  export async function editShippingMethod({name, sortOrder, status, shortDescription, cost, region, country }, id) {
    const response = await axiosInstance.put(`shippings/${id}`, {
      name: name, 
      sort_order: sortOrder, 
      status: JSON.parse(status),
      description: shortDescription,
      cost,
      region,
      country
    });
    return response.data;
  }
  
  export async function fetchSingleShippingMethod(id) {
    const response = await axiosInstance.get(`shippings/${id}`);
    return response.data;
  }
  
  
  