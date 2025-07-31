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
          name: 'index',
          component: () => import('@/views/index.vue'),
        },
        {
          path: 'guide/',
          name: 'guide',
          component: () => import('@/views/guide/index.vue'),
          children: [
            {
              path: 'introduction',
              name: 'introduction',
              component: () => import('@/views/guide/introduction.vue'),
            },
            {
              path: ':guideName',
              name: 'guideDetail',
              component: () => import('@/views/Loader.vue'),
              props: (route) => ({
                componentPath: `./guide/${route.params.guideName}.vue`
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
              path: 'overview',
              name: 'overview',
              component: () => import('@/views/components/overview.vue'),
            },
            {
              path: ':componentName',
              name: 'componentDetail',
              component: () => import('@/views/Loader.vue'),
              props: (route) => ({
                componentPath: `./components/${route.params.componentName}.vue`
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
