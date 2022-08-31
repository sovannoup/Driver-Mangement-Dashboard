

import {getById} from  '@/api/cms-menu'
// import { Computed } from 'vuex'
const modelDefault = {
    target: "",
    menuable: ""
}
export const state = {
    model: { ...modelDefault },
    loading: false,
    model_list : [] 
}

export const getters = {
    cmsMenu: state=> state.model? state.model : undefined, 
}
export const mutations = {
    getById(state, payload){
        state.loading = true
    },
    getByIdSuccess(state, payload){
        state.model  =  payload.data
        state.loading = false
    },
    getByIdFail(state, payload){
        state.model  = null
        state.loading = false
    },
    clearData(state){
        state.model = modelDefault
    }
}
export const actions ={
    async getById({commit, getters}, payload){
        
        commit('getById')
        try {
            const res  = await getById(payload)
            commit('getByIdSuccess', res.data)
        } catch (error) {
            commit('getByIdFail', error)
        }
    },
    clearData({ commit}){
         commit('clearData')
    }
}