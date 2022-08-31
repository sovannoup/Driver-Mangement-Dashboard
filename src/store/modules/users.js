

import {getById} from  '@/api/users';

const modelDefault = {
    firstname:"",
    lastname:"",
    email :"",
    password:"",
    password_confirmation:"",
    status: false,
    image: "",
    image_path: null,
}

export const state = {
    model: { ...modelDefault },
    loading: false,
}

export const getters = {
    user: state=> state.model? state.model : undefined, 
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
    },
}