import axiosInstance from './interceptors';

export async function fetchCoupons(payload) {
    const response = await axiosInstance.get('coupons', {
      params: payload
    }
    );
    return response.data;
}

export async function singleDeleteCoupon(id) {
  const response = await axiosInstance.delete(`coupons/${id}`);
  return response.data;
}

export async function multipleDeleteCoupon(ids) {
  const response = await axiosInstance.post(`coupons/multi-delete`, {ids});
  return response.data;
}

export async function fetchSingleCoupon(id) {
  const response = await axiosInstance.get(`coupons/${id}`);
  return response.data;
}

export async function editCoupon(form, id) {
  const response = await axiosInstance.put(`coupons/${id}`, form);
  return response.data;
}

export async function addCoupon(form, id) {
  const response = await axiosInstance.post(`coupons`, form);
  return response.data;
}

export async function fetchCategories() {
  const response = await axiosInstance.get(`categories?limit=9999`);
  return response.data;
}

export async function fetchProducts() {
  const response = await axiosInstance.get(`products?limit=9999`);
  return response.data;
}