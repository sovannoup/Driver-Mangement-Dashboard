import store from "@/store";
export default async (to, from, next) => { 
      const token = store.getters['auth/accessToken']
      if (to.name !== 'login' && !token) {
            next({ name: 'login' })
      }
      else {
            next()
      }

      // console.log(to.name)
   
  
  
    
   
}