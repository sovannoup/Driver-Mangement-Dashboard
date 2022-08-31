import axiosInstance from './interceptors';

export async function assignedOrderListing(payload) {
    const response = await axiosInstance.get('assigned-order-listing', { params: payload });
    return response.data;
}

export async function unassignedOrderListing(payload) {
    const response = await axiosInstance.get('unassigned-order-listing', { params: payload });
    return response.data;
}

export async function orderListingByDriver(payload) {
    const response = await axiosInstance.get('order-listing-by-driver', { params: payload });
    return response.data;
}
export async function show(id) {
    const response = await axiosInstance.get(`sales/${id}`);
    return response.data;
  }