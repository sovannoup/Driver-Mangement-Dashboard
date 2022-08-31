import * as types from '../type-mutation';
import { fetchUserProfile } from "@/api/profile";
import useNotyf from "../../composable/useNotyf";
import { computed } from '@vue/reactivity';
import { useI18n } from 'vue-i18n';
export const state = {
    user: null,  
    userError: "",
    isUserProfileLoading: false
}

export const getters = {
    user : state => state.user,
    userError : state => state.userError,
    isUserProfileLoading : state => state.isUserProfileLoading,
    fullName: state => computed(()=> { return state.user?.firstname + "  " + state.user?.lastname})
}

export const mutations = {
    [types.USER](state) {
        state.isUserProfileLoading = true
    },
    [types.USER_SUCCESS](state, payload) {
        state.isUserProfileLoading = false
        state.user = payload;
    },
    userFail(state, payload) {
        state.isUserProfileLoading = false
        state.userError = payload;
    },
}

export const actions = {
    async getUserProfile ({ commit }) {
        const notyf = useNotyf();
        commit(types.USER);
        try {
            const user = await fetchUserProfile();
            commit(types.USER_SUCCESS, user);
        } catch (error) {
            commit('userFail', error?.response?.data);
            // notyf.error(t("Something went wrong while fetching user profile"))
            throw error
        }
    }
}
