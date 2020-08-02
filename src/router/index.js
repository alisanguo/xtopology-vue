import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "basicLayout" */ '@/layouts/basicLayout'),
    children: [
      {
        path: '/xtopology',
        name: 'xtopology',
        component: () =>
          import(/* webpackChunkName: "xtopology" */ '@/views/xtopology'),
        children: [
          {
            path: '/xtopology/workspace',
            name: 'xtopologyWorkspace',
            component: () =>
              import(
                /* webpackChunkName: "xtopology" */ '@/views/xtopology/workspace'
              )
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
