


import * as types from '../type-mutation'; 
import * as api from '@/api/driver'

const defaultValue = {
    first_name:  null,
    last_name: null,
    id: 0
}

export const state = {
        driver:  defaultValue,
        drivers : [],
        form_loading: false
} 
export const getters = {
    driver: state => state.driver? state.driver : undefined,
    drivers: state => state.drivers,
    form_loading: state => state.form_loading
} 
export const mutations = { 
    addDriver(state, payload){
        state.drivers.push(payload)
    },
    OnAddDriver(state){
        state.form_loading = true
    },
    onAddDriverFail(state){
        state.form_loading = false
    },
    onAddDriverDone(state){
        state.form_loading = false
    },

}

export const actions = {
//   async  addDriver({commit}, payload){  

//         commit('OnAddDriver')
//         try {
//             const data = await api.create(payload)
//             console.log(data)
//             commit('onAddDriverDone')
//         }
//         catch (err) {
//             commit('onAddDriverFail')
//         }
//         commit('addDriver', payload)
//     }
}
