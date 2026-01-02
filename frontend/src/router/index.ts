import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  easing: 'ease',
  speed: 500
})

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/app/dashboard'
  },
  // 兼容文档链接：将 /paper/<name>.md 重定向到学习中心文章路由
  {
    path: '/paper/:name.md',
    name: 'PaperMdRedirect',
    redirect: (to) => `/app/learning/article/${to.params.name as string}`,
    meta: { title: '文档跳转', hideInMenu: true, requiresAuth: false }
  },
  // 统一布局路由：所有需要布局的页面都作为 /app 的子路由
  {
    path: '/app',
    name: 'AppLayout',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/app/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: '仪表板',
          icon: 'Dashboard',
          requiresAuth: true,
          transition: 'fade'
        }
      },
      {
        path: 'analysis',
        redirect: '/app/analysis/single'
      },
      {
        path: 'analysis/single',
        name: 'SingleAnalysis',
        component: () => import('@/views/Analysis/SingleAnalysis.vue'),
        meta: {
          title: '单股分析',
          icon: 'TrendCharts',
          requiresAuth: true
        }
      },
      {
        path: 'analysis/batch',
        name: 'BatchAnalysis',
        component: () => import('@/views/Analysis/BatchAnalysis.vue'),
        meta: {
          title: '批量分析',
          icon: 'TrendCharts',
          requiresAuth: true
        }
      },
      {
        path: 'screening',
        name: 'StockScreening',
        component: () => import('@/views/Screening/index.vue'),
        meta: {
          title: '股票筛选',
          icon: 'Search',
          requiresAuth: true,
          transition: 'slide-up'
        }
      },
      {
        path: 'favorites',
        name: 'Favorites',
        component: () => import('@/views/Favorites/index.vue'),
        meta: {
          title: '我的自选股',
          icon: 'Star',
          requiresAuth: true,
          transition: 'slide-up'
        }
      },
      {
        path: 'learning',
        name: 'LearningHome',
        component: () => import('@/views/Learning/index.vue'),
        meta: {
          title: '学习中心',
          icon: 'Reading',
          requiresAuth: false,
          transition: 'fade'
        }
      },
      {
        path: 'learning/:category',
        name: 'LearningCategory',
        component: () => import('@/views/Learning/Category.vue'),
        meta: {
          title: '学习分类',
          requiresAuth: false
        }
      },
      {
        path: 'learning/article/:id',
        name: 'LearningArticle',
        component: () => import('@/views/Learning/Article.vue'),
        meta: {
          title: '文章详情',
          requiresAuth: false
        }
      },
      {
        path: 'stocks/:code',
        name: 'StockDetail',
        component: () => import('@/views/Stocks/Detail.vue'),
        meta: {
          title: '股票详情',
          icon: 'TrendCharts',
          requiresAuth: true,
          hideInMenu: true,
          transition: 'fade'
        }
      },
      {
        path: 'tasks',
        name: 'TaskCenter',
        component: () => import('@/views/Tasks/TaskCenter.vue'),
        meta: {
          title: '任务中心',
          icon: 'List',
          requiresAuth: true,
          transition: 'slide-up'
        }
      },
      {
        path: 'reports',
        name: 'ReportsHome',
        component: () => import('@/views/Reports/index.vue'),
        meta: {
          title: '分析报告',
          icon: 'Document',
          requiresAuth: true,
          transition: 'fade'
        }
      },
      {
        path: 'reports/view/:id',
        name: 'ReportDetail',
        component: () => import('@/views/Reports/ReportDetail.vue'),
        meta: {
          title: '报告详情',
          requiresAuth: true
        }
      },
      {
        path: 'reports/token',
        name: 'TokenStatistics',
        component: () => import('@/views/Reports/TokenStatistics.vue'),
        meta: {
          title: 'Token统计',
          requiresAuth: true
        }
      },
      {
        path: 'settings',
        name: 'SettingsHome',
        component: () => import('@/views/Settings/index.vue'),
        meta: {
          title: '设置',
          icon: 'Setting',
          requiresAuth: true,
          transition: 'slide-left'
        }
      },
      {
        path: 'settings/config',
        name: 'ConfigManagement',
        component: () => import('@/views/Settings/ConfigManagement.vue'),
        meta: {
          title: '配置管理',
          requiresAuth: true
        }
      },
      {
        path: 'settings/database',
        name: 'DatabaseManagement',
        component: () => import('@/views/System/DatabaseManagement.vue'),
        meta: {
          title: '数据库管理',
          requiresAuth: true
        }
      },
      {
        path: 'settings/logs',
        name: 'OperationLogs',
        component: () => import('@/views/System/OperationLogs.vue'),
        meta: {
          title: '操作日志',
          requiresAuth: true
        }
      },
      {
        path: 'settings/system-logs',
        name: 'LogManagement',
        component: () => import('@/views/System/LogManagement.vue'),
        meta: {
          title: '系统日志',
          requiresAuth: true
        }
      },
      {
        path: 'settings/sync',
        name: 'MultiSourceSync',
        component: () => import('@/views/System/MultiSourceSync.vue'),
        meta: {
          title: '多数据源同步',
          requiresAuth: true
        }
      },
      {
        path: 'settings/cache',
        name: 'CacheManagement',
        component: () => import('@/views/Settings/CacheManagement.vue'),
        meta: {
          title: '缓存管理',
          requiresAuth: true
        }
      },
      {
        path: 'settings/usage',
        name: 'UsageStatistics',
        component: () => import('@/views/Settings/UsageStatistics.vue'),
        meta: {
          title: '使用统计',
          requiresAuth: true
        }
      },
      {
        path: 'settings/scheduler',
        name: 'SchedulerManagement',
        component: () => import('@/views/System/SchedulerManagement.vue'),
        meta: {
          title: '定时任务',
          requiresAuth: true
        }
      },
      {
        path: 'paper',
        name: 'PaperTrading',
        component: () => import('@/views/PaperTrading/index.vue'),
        meta: {
          title: '模拟交易',
          icon: 'CreditCard',
          requiresAuth: true,
          transition: 'slide-up'
        }
      }
    ]
  },
  // 向后兼容：重定向旧路径到新路径
  { path: '/dashboard', redirect: '/app/dashboard' },
  { path: '/analysis', redirect: '/app/analysis/single' },
  { path: '/analysis/single', redirect: '/app/analysis/single' },
  { path: '/analysis/batch', redirect: '/app/analysis/batch' },
  { path: '/analysis/history', redirect: '/app/tasks?tab=completed' },
  { path: '/screening', redirect: '/app/screening' },
  { path: '/favorites', redirect: '/app/favorites' },
  { path: '/learning', redirect: '/app/learning' },
  { path: '/learning/:category', redirect: (to) => `/app/learning/${to.params.category}` },
  { path: '/learning/article/:id', redirect: (to) => `/app/learning/article/${to.params.id}` },
  { path: '/stocks/:code', redirect: (to) => `/app/stocks/${to.params.code}` },
  { path: '/tasks', redirect: '/app/tasks' },
  { path: '/queue', redirect: '/app/tasks' },
  { path: '/reports', redirect: '/app/reports' },
  { path: '/reports/view/:id', redirect: (to) => `/app/reports/view/${to.params.id}` },
  { path: '/reports/token', redirect: '/app/reports/token' },
  { path: '/settings', redirect: '/app/settings' },
  { path: '/settings/:pathMatch(.*)*', redirect: (to) => `/app/settings/${to.params.pathMatch}` },
  { path: '/paper', redirect: '/app/paper' },
  // 不需要布局的路由保持在顶层
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
      transition: 'fade'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
    meta: {
      title: '关于',
      icon: 'InfoFilled',
      requiresAuth: false,
      transition: 'fade'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Error/404.vue'),
    meta: {
      title: '页面不存在',
      hideInMenu: true,
      requiresAuth: true
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  const authStore = useAuthStore()
  const appStore = useAppStore()

  // 设置页面标题
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - TradingAgents-CN`
  }

  console.log('🚦 路由守卫检查:', {
    path: to.fullPath,
    name: to.name,
    requiresAuth: to.meta.requiresAuth,
    isAuthenticated: authStore.isAuthenticated,
    hasToken: !!authStore.token
  })

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('🔒 需要认证但用户未登录:', {
      path: to.fullPath,
      requiresAuth: to.meta.requiresAuth,
      isAuthenticated: authStore.isAuthenticated,
      token: authStore.token ? '存在' : '不存在'
    })
    // 保存原始路径，登录后跳转
    authStore.setRedirectPath(to.fullPath)
    next('/login')
    return
  }



  // 如果已登录且访问登录页，重定向到仪表板
  if (authStore.isAuthenticated && to.name === 'Login') {
    next('/app/dashboard')
    return
  }

  // 更新当前路由信息
  appStore.setCurrentRoute(to)

  next()
})

// 全局后置守卫
router.afterEach((to, from) => {
  // 结束进度条
  NProgress.done()

  // 页面切换后的处理
  nextTick(() => {
    // 可以在这里添加页面分析、埋点等逻辑
  })
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
  NProgress.done()
  ElMessage.error('页面加载失败，请重试')
})

export default router

// 导出路由配置供其他地方使用
export { routes }
