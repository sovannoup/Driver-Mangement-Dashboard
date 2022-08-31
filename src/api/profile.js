import axiosInstance from './interceptors';
export async function fetchUserProfile() {
  const response = await axiosInstance.get('user-detail');
  return response.data.user;
}

export async function updateUserProfile({ id, email, firstName, lastName, image }) {
  const response = await axiosInstance.put('users/' + id, { email: email, firstname: firstName, lastname: lastName, image: image });
  return response.data;
}

export async function updateUserPassword({ oldPassword, password, passwordConfirmation }) {
  const response = await axiosInstance.post('change-password',
    { current_password: oldPassword, password: password, password_confirmation: passwordConfirmation });
  return response.data;
}