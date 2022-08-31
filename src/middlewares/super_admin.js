import store from "@/store";
export default async (to, from, next) => { 
    if (store.getters['profile/user'].type !== "admin") {  
      next({ name: '401' })
    } else {
      next()
    }
}