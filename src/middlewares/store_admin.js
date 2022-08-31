import store from "@/store";
export default async (to, from, next) => { 
    if (store.getters['profile/user'].type !== "store") {  
      next({ name: '401' })
    } else {
      next()
    }

}