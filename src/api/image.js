import axiosInstance from './interceptors';

export async function uploadImage(payload) {
    const response = await axiosInstance.post('update_profile_image', payload);
    return response.data;
}
export async function updateProfileImage(payload) {
    const response = await axiosInstance.post('update_profile_image', payload);
    return response.data;
}
export async function updateUserImage(payload) {
    const response = await axiosInstance.post('upload_single_image', payload);
    return response.data;
}
