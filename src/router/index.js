import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentInstance, nextTick } from 'vue' 
import store from '@/store'
import routes from './routes'
import {uniq} from 'lodash'

const globalMiddleware = []
const routeMiddleware = resolveMiddleware(
  require.context('@/middlewares', false, /.*\.js$/)
)
const router = registerVueRouter() 
export default router
 
function registerVueRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)
  return router
}

async function beforeEach(to, from, next) {
  


 
  let coms = { ...to }.matched.flatMap(record => Object.values(record.components)) 
  
  const components = await resolveComponents(coms) 
  if (components.length === 0) {
    return next()
  } 
  const middleware = getMiddleware(components)  
  // // Call each middleware.
    callMiddleware(middleware, to, from, (...args) => {   
    if (args.length === 0) 
      to.meta.layout = components[0].layout 
    // store.dispatch("layout/setLayout", components[0].layout); 
    next(...args)
  })
}


function resolveMiddleware(requireContext) {
  return requireContext.keys()
    .map(file =>
      [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
    )
    .reduce((guards, [name, guard]) => (
      { ...guards, [name]: guard.default }
    ), {})
}

 
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  }
  if (to.hash) {
    return { selector: to.hash }
  }
  const aliasRouter = { ...to }.matched.flatMap(com => Object.assign(com.components))
  const [component] = aliasRouter.slice(-1)
  if (component && component.scrollToTop === false) {
    return {}
  }

  return { x: 0, y: 0 }
}

async function afterEach(to, from, next) {
  await  nextTick()
}



function resolveComponents(components) {
  return Promise.all(components.map(component => {
    return typeof component === 'function' ? component() : component
  }))
}

function getMiddleware(components) {
  const middleware = [...globalMiddleware]
  // .filter(c => c.middleware)
  let layoutCom = ''
  let clearBack = true
  components.forEach(component => {  
    if(component.middleware){
      if (Array.isArray(component.middleware)) {
        middleware.push(...component.middleware)
      } else {
        middleware.push(component.middleware)
      }
    } 
    layoutCom = component?.layout 
     if(component?.back){
       clearBack = false
       store.dispatch('layout/setBack', component.back)
     }
     if(clearBack){
      store.dispatch('layout/setBack', null)
     }
  })
  if(layoutCom){
    const layout = require('@/layouts/'+ layoutCom) 
    if(layout.default && layout.default.middleware){ 
      if (Array.isArray(layout.default.middleware)) {
        middleware.push(...layout.default.middleware)
      } else {
        middleware.push(layout.default.middleware)
      }
    }  
  }

  return uniq(middleware)
}

 
function callMiddleware(middleware, to, from, next) {
  const stack = middleware.reverse()

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {

      return next(...args)

    }
    const middleware = stack.pop()
    if (typeof middleware === 'function') {
      middleware(to, from, _next)
    } else if (routeMiddleware[middleware]) { 
      routeMiddleware[middleware](to, from, _next)
    } else {
      throw Error(`Undefined middleware [${middleware}]`)
    }
  }

  _next()
}