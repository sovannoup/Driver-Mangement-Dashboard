import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
const requireContext = require.context('./modules', false, /.*\.js$/);
const modules = requireContext.keys()
    .map(file => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce((modules, [name, module]) => {
        if (module.namespaced === undefined) {
            module.namespaced = true
        } 
        return {
            ...modules,
            [name]: module
        }
    }, {}); 
export default createStore({
  modules,
  plugins: [createPersistedState({
    paths: [
        'auth.accessToken',
        'profile',
        'i18n.local'
        // 'profile.user',
    ]
})],
})
