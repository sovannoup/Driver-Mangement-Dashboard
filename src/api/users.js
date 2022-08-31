import axiosInstance from './interceptors';
import store from '../store';

const resolveTypeOfUser = () => {
  // const userLoginType = store.getters["profile/user"].type;
  // if (userLoginType === "store") {
    // console.log(userLoginType)
      return "/users"
  // } else if ("admin") {
  //   console.log(userLoginType)
  //     return "/admin-users"
  // } 
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
  export async function singleDeleteUsers(id) {
    const response = await axiosInstance.delete(`${resolveTypeOfUser()}/${id}`);
    return response.data;
  }
  
  export async function multipleDeleteUsers(ids) {
    const response = await axiosInstance.post(`${resolveTypeOfUser()}/multiple-destroy`, {ids});
    return response.data;
  }
  
  export async function getSingleUsers(id) {
    const response = await axiosInstance.get(`${resolveTypeOfUser()}/${id}`);
    return response.data;
  }
  
  export async function editUsers(form, id) {
    const response = await axiosInstance.put(`${resolveTypeOfUser()}/${id}`, form);
    return response.data;
  }
  
  export async function addUsers(form) {
    const response = await axiosInstance.post(`${resolveTypeOfUser()}`, form);
    return response.data;
  }

  export async function getById(id)
  {
    const res = await axiosInstance.get(`${resolveTypeOfUser()}/${id}`);
   
    return mapUser(res.data.data);
  }

  export async function getList(payload) {
    const response = await axiosInstance.get(`${resolveTypeOfUser()}`, { params: payload });
    return response.data;
  }

  function mapUser(data){
    let {email, firstname,lastname, id, status , image , title} = data;
    console.log()

    return {
      email,
      firstname,
      id,
      image,
      lastname,
      status,
      title

    }
  }