


import * as types from '../type-mutation'; 
export const state = {
    layout: null,  
    toggle: '',
    back: null
} 
export const getters = {
    layout : state => state.layout,
    back : state => state.back, 
    toggle : state => state.toggle,
} 
export const mutations = {
    Toggle(state, payload) {
        state.toggle = payload;
    },
    [types.LAYOUT](state, payload) {
        state.layout = payload;
    },
    setBack(state, payload){
        state.back = payload
    }
}

export const actions = {
    setLayout({ commit }, payload) {
        commit(types.LAYOUT, payload);
    },
    setToggle({ commit }, payload) {  
        commit('Toggle', payload);
    },
    setBack({ commit }, payload) {  
        commit('setBack', payload);
    },
}
