import store from "@/store";
export default async (to, from, next) => { 
    const token = store.getters['auth/accessToken']
    if (token) { 
        next('/');  
       
    }  else {
        next() 
    }
    
    
}