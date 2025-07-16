import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout.vue'),
      children: [
        {
          path: '',
          name:'index',
          component: () => import('@/views/index.vue'),
        },
        {
          path: 'guide/',
          name: 'guide',
          component: () => import('@/views/guide/index.vue'),
          children: [
            {
              path: 'start.html',
              name: 'start',
              component: () => import('@/views/guide/start.vue'),
            },
            {
              path: ':componentName',
              name: 'componentDetail',
              component: () => import('@/views/guide/GuideLoader.vue'),
              props: (route) => ({
                componentPath: `./views/guide/${route.params.componentName}.vue`
              })
            }
          ]
        },
        {
          path: 'components/',
          name: 'components',
          component: () => import('@/views/components/index.vue'),
          children: [
            {
              path: 'overview.html',
              name: 'overview',
              component: () => import('@/views/components/overview.vue'),
            },
            {
              path: ':componentName',
              name: 'componentDetail',
              component: () => import('@/views/components/ComponentLoader.vue'),
              props: (route) => ({
                componentPath: `./views/components/${route.params.componentName}.vue`
              })
            }
          ]
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ],
})

export default router
