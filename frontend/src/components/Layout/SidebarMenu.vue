<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="appStore.sidebarCollapsed"
    :unique-opened="true"
    @select="handleMenuSelect"
    class="sidebar-menu"
  >
    <el-menu-item index="/app/dashboard">
      <el-icon><Odometer /></el-icon>
      <template #title>仪表板</template>
    </el-menu-item>

    <el-menu-item index="/app/learning">
      <el-icon><Reading /></el-icon>
      <template #title>学习中心</template>
    </el-menu-item>

    <el-sub-menu index="/app/analysis">
      <template #title>
        <el-icon><TrendCharts /></el-icon>
        <span>股票分析</span>
      </template>
      <el-menu-item index="/app/analysis/single">单股分析</el-menu-item>
      <el-menu-item index="/app/analysis/batch">批量分析</el-menu-item>
      <!-- 新增：将分析报告作为股票分析的子菜单 -->
      <el-menu-item index="/app/reports">分析报告</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/app/tasks">
      <el-icon><List /></el-icon>
      <template #title>任务中心</template>
    </el-menu-item>

    <el-menu-item index="/app/screening">
      <el-icon><Search /></el-icon>
      <template #title>股票筛选</template>
    </el-menu-item>

    <el-menu-item index="/app/favorites">
      <el-icon><Star /></el-icon>
      <template #title>我的自选股</template>
    </el-menu-item>

    <el-menu-item index="/app/paper">
      <el-icon><CreditCard /></el-icon>
      <template #title>模拟交易</template>
    </el-menu-item>


    <!-- 分析报告已移至"股票分析"子菜单，保留注释便于追踪 -->
    <!--
    <el-menu-item index="/app/reports">
      <el-icon><Document /></el-icon>
      <template #title>分析报告</template>
    </el-menu-item>
    -->

    <el-sub-menu index="/app/settings">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>设置</span>
      </template>

      <!-- 个人设置 -->
      <el-sub-menu index="/app/settings-personal">
        <template #title>个人设置</template>
        <el-menu-item index="/app/settings">通用设置</el-menu-item>
        <el-menu-item index="/app/settings?tab=appearance">外观设置</el-menu-item>
        <el-menu-item index="/app/settings?tab=analysis">分析偏好</el-menu-item>
        <el-menu-item index="/app/settings?tab=notifications">通知设置</el-menu-item>
        <el-menu-item index="/app/settings?tab=security">安全设置</el-menu-item>
      </el-sub-menu>

      <!-- 系统配置 -->
      <el-sub-menu index="/app/settings-config">
        <template #title>系统配置</template>
        <el-menu-item index="/app/settings/config">配置管理</el-menu-item>
        <el-menu-item index="/app/settings/cache">缓存管理</el-menu-item>
      </el-sub-menu>

      <!-- 系统管理 -->
      <el-sub-menu index="/app/settings-admin">
        <template #title>系统管理</template>
        <el-menu-item index="/app/settings/database">数据库管理</el-menu-item>
        <el-menu-item index="/app/settings/logs">操作日志</el-menu-item>
        <el-menu-item index="/app/settings/system-logs">系统日志</el-menu-item>
        <el-menu-item index="/app/settings/sync">多数据源同步</el-menu-item>
        <el-menu-item index="/app/settings/scheduler">定时任务</el-menu-item>
        <el-menu-item index="/app/settings/usage">使用统计</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-menu-item index="/about">
      <el-icon><InfoFilled /></el-icon>
      <template #title>关于</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import {
  Odometer,
  Reading,
  TrendCharts,
  Search,
  Star,
  List,
  /* Document 移除：不再使用顶级分析报告菜单图标 */
  Setting,
  InfoFilled,
  CreditCard
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 计算当前激活的菜单项（包括 query 参数）
const activeMenu = computed(() => {
  const path = route.path
  const query = route.query
  
  // 如果是设置页面且有 tab 参数，需要包含 query 参数来匹配菜单
  if (path === '/app/settings' && query.tab) {
    return `${path}?tab=${query.tab}`
  }
  
  return path
})

// 处理菜单选择事件
const handleMenuSelect = (index: string) => {
  // 解析路径和 query 参数
  const [path, queryString] = index.split('?')
  const query: Record<string, string> = {}
  
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=')
      if (key && value) {
        query[key] = decodeURIComponent(value)
      }
    })
  }
  
  // 使用编程式导航
  router.push({
    path: path,
    query: Object.keys(query).length > 0 ? query : undefined
  })
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  border: none;
  height: 100%;

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 48px;
    line-height: 48px;
  }

  :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>
