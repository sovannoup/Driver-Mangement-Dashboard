import Toggle from "@vueform/toggle";
// import 'vue-skeletor/dist/vue-skeletor.css';
// import { Skeletor } from 'vue-skeletor';
import VueLazyLoad from 'vue3-lazyload'


const requireComponent = require.context(
    // The relative path of the components folder
    './',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /.*\.vue$/,
);

const register = (app) => {

    app.use(VueLazyLoad)

    requireComponent.keys().forEach((fileName) => {
        // Get component config
        const componentConfig = requireComponent(fileName);
        // Get component name
        const componentName = fileName.split('/').pop() ?.replace(/\.\w+$/, '');
        let comName = componentConfig.default.name ? componentConfig.default.name : componentName
        app.component(comName, componentConfig.default || componentConfig);
    });

    app.component('Toggle', Toggle);
    // app.component('Skeletor', Skeletor);



    // 
};

export default { register };