import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: resolve => require(['@/layout/layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'index',
        component: resolve => require(['@/views/page/index'], resolve),
        meta: {
          title: '中国世界地质公园导览信息系统'
        }
      },
      {
        path: 'index2',
        name: 'index2',
        component: resolve => require(['@/views/page2/index'], resolve),
        meta: {
          title: '媒体公园'
        }
      },
      {
        path: 'index3',
        name: 'index3',
        component: resolve => require(['@/views/page3/index'], resolve),
        meta: {
          title: '智慧公园'
        }
      },
      
    ]
  }
]

const router = new VueRouter({ routes })

router.beforeResolve((to, from, next) => {
  to.matched.some(record => {
    if (record.meta) {
      if (record.meta.title) {
        document.title = record.meta.title
      }
    }
  })
  next()
})

export default router