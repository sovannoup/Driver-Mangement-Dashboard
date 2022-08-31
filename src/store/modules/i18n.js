import * as types from '../type-mutation'; 
import {  loadMessage} from "@/plugins/i18n"; 
const defaultLocal = 'en'
const defaultlauguages =  [
    {
        local: 'en',
        name: "English",
    },
    {
        local: 'km',
        name: "Khmer"
    }
]
export const state = {
    local: defaultLocal, 
    lauguages: defaultlauguages
} 
export const getters = {
    local : state => state.local,
    lauguages : state => state.lauguages 
} 
export const mutations = {
    setLocal(state, payload) {
        state.local = payload;
    } 
} 
export const actions = { 
    setLocal({ commit }, payload) {  
        commit('setLocal', payload);
        loadMessage(payload)
    }
}
