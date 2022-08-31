
import axiosInstance from './interceptors';

const assingDriver = {
  "sale_id": 0,
  "driver_id": 0
}
const driver =
{
  "gender": "",
  "phone_number": "",
  "firstname": "",
  "lastname": "",
  "email": "",
  "password": null,
  "password_confirmation": null,
  "status": "AVAILABLED",
  "sort_order": 0,
  "is_publish": "PUBLISHED"
}


export async function getList(payload) {
  const response = await axiosInstance.get('drivers', { params: payload });
  return response.data;
}

export async function create(payload = driver) {
  const response = await axiosInstance.post(`drivers`, payload);
  return response.data;
}

export async function show(id) {
  const response = await axiosInstance.get(`drivers/${id}`);
  return response.data;
}

export async function edit(driver, id) {
  const response = await axiosInstance.put(`drivers/${id}`,driver);
  return response.data;
}

export async function remove(id) {
  const response = await axiosInstance.delete(`drivers/${id}`);
  return response.data;
}

export async function assignDriver(payload = assingDriver) {
  const response = await axiosInstance.post(`assign-driver-to-sale`, payload);
  return response.data;
}

export async function availableDriver(payload) {
  const response = await axiosInstance.get('available-drivers', {params: payload});
  return response.data;
}

export async function trackingDriver(payload) {
  const response = await axiosInstance.get('tracking-drivers', {params: payload});
  return response.data;
}

export async function multipleDeleteDrivers(ids) {
  const response = await axiosInstance.post('drivers/multiple-destroy', {ids});
  return response.data;
}

