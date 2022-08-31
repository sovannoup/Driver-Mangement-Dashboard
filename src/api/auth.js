import axiosInstance from './interceptors';

export async function login({email, password }) {
    const response = await axiosInstance.post('login', { email: email, password: password });
    return response.data;
  }
  
  export async function logout() {
    const response = await axiosInstance.post('auth/logout');
    return response.data;
  }

  export async function forgetPassword({email}){
    const response = await axiosInstance.post('forgot-password', {email: email})
    return response.data
  }

  export async function validateCode({email, code}){
    const response = await axiosInstance.post('validate-code', {email: email, code: code})
    return response.data
  }

  export async function resetPassword({email, code, password, password_confirmation}){
    const response = await axiosInstance.post('reset-password', {email: email, code: code, password: password, password_confirmation: password_confirmation})
    return response.data
  }