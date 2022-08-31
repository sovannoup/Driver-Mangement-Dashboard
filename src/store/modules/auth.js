import * as types from "../type-mutation";
import {
  login,
  logout,
  forgetPassword,
  validateCode,
  resetPassword,
} from "../../api/auth";
import useNotyf from "../../composable/useNotyf";
import router from "../../router/index";

export const state = {
  accessToken: null,
  loginError: "",
  loading: false,
  logoutError: "",
  resetPasswordEmail: "",
  resetPasswordCode: "",
};

export const getters = {
  accessToken: (state) => state.accessToken,
  loginError: (state) => state.loginError,
  loading: (state) => state.loading,
  logoutError: (state) => state.logoutError,
  resetPasswordEmail: (state) => state.resetPasswordEmail,
  resetPasswordCode: (state) => state.resetPasswordCode,
};

export const mutations = {
  [types.VALIDATE_CODE](state, payload) {
    state.resetPasswordCode = payload.code;
    state.loading = false;
  },
  [types.FORGET_PASSWORD](state, payload) {
    state.resetPasswordEmail = payload.email;
    state.loading = false;
  },
  [types.LOGIN](state) {
    state.loading = true;
  },
  [types.LOGIN_SUCCESS](state, payload) {
    state.loading = false;
    state.accessToken = payload;
  },
  loginFailed(state, payload) {
    state.loading = false;
    state.loginError = payload;
  },
  [types.LOGOUT](state) {
    state.loading = true;
  },
  [types.LOGIN_PURGE](state) {
    state.accessToken = null;
    state.loginError = "";
    state.loading = false;
  },
  logoutFailed(state, payload) {
    state.loading = false;
    state.loginError = payload;
  },
  loadingState(state, payload) {
    state.loading = payload;
  },
};

export const actions = {
  async authChangePassword({ commit }, payload) {
    const notyf = useNotyf();
    commit("loadingState", true);
    try {
      await resetPassword(payload);
      notyf.success("Password Change Successfully!");
      router.push({ name: "login" });
    } catch (error) {
      console.log(error);
    }
    commit("loadingState", false);
  },
  async authValidateCode({ commit }, payload) {
    const notyf = useNotyf();
    commit("loadingState", true);
    try {
      await validateCode(payload);
      notyf.success("Otp Valid!");
      commit(types.VALIDATE_CODE, payload);
      router.push({ name: "auth-change-password" });
    } catch (error) {
      console.log(error);
    }
    commit("loadingState", false);
  },
  async authForgetPassword({ commit }, payload) {
    const notyf = useNotyf();
    commit("loadingState", true);
    try {
      await forgetPassword(payload);
      notyf.success("Otp code sent!");
      commit(types.FORGET_PASSWORD, payload);
      router.push({ name: "validate-code" });
    } catch (error) {
      console.log(error);
    }
    commit("loadingState", false);
  },
  async login({ commit }, payload) {
    const notyf = useNotyf();
    commit(types.LOGIN);
    try {
      const response = await login(payload);
      commit(types.LOGIN_SUCCESS, response.access_token);
      notyf.success(payload.success);
      router.push("/");
    } catch (error) {
      commit("loginFailed", error?.response?.data);
      // notyf.error("Something went wrong while trying to login")
    }
  },
  async logout({ commit }, payload) {
    const notyf = useNotyf();
    commit(types.LOGOUT);
    try {
      // await logout();
      commit(types.LOGIN_PURGE);
      notyf.success(payload.sus);
      router.push("/login");
    } catch (error) {
      commit(types.LOGIN_PURGE);
      commit("logoutFailed", error?.response?.data);
      notyf.error(payload.fail);
      router.push("/login");
    }
  },
  clearAuth({ commit }) {
    commit(types.LOGIN_PURGE);
  },
};
