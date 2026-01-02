# 菜单路由检查清单

## 已修复的问题

1. ✅ **深层菜单跳转问题**：移除了 `router` 属性，改用编程式导航 `@select` 事件处理
2. ✅ **Query 参数支持**：菜单中的 query 参数（如 `?tab=appearance`）现在可以正确解析和跳转
3. ✅ **Settings 组件路径兼容**：更新了 Settings 组件的路径判断，支持 `/app/settings` 和 `/settings` 两种格式

## 菜单路径验证

### 一级菜单
- ✅ `/app/dashboard` - 仪表板
- ✅ `/app/learning` - 学习中心
- ✅ `/app/tasks` - 任务中心
- ✅ `/app/screening` - 股票筛选
- ✅ `/app/favorites` - 我的自选股
- ✅ `/app/paper` - 模拟交易
- ✅ `/about` - 关于

### 二级菜单（股票分析）
- ✅ `/app/analysis/single` - 单股分析
- ✅ `/app/analysis/batch` - 批量分析
- ✅ `/app/reports` - 分析报告

### 三级菜单（设置）

#### 个人设置
- ✅ `/app/settings` - 通用设置（默认 tab=general）
- ✅ `/app/settings?tab=appearance` - 外观设置
- ✅ `/app/settings?tab=analysis` - 分析偏好
- ✅ `/app/settings?tab=notifications` - 通知设置
- ✅ `/app/settings?tab=security` - 安全设置

#### 系统配置
- ✅ `/app/settings/config` - 配置管理
- ✅ `/app/settings/cache` - 缓存管理

#### 系统管理
- ✅ `/app/settings/database` - 数据库管理
- ✅ `/app/settings/logs` - 操作日志
- ✅ `/app/settings/system-logs` - 系统日志
- ✅ `/app/settings/sync` - 多数据源同步
- ✅ `/app/settings/scheduler` - 定时任务
- ✅ `/app/settings/usage` - 使用统计

## 测试步骤

1. **测试一级菜单**
   - 点击"仪表板" → 应跳转到 `/app/dashboard`
   - 点击"学习中心" → 应跳转到 `/app/learning`
   - 点击"任务中心" → 应跳转到 `/app/tasks`
   - 点击"股票筛选" → 应跳转到 `/app/screening`
   - 点击"我的自选股" → 应跳转到 `/app/favorites`
   - 点击"模拟交易" → 应跳转到 `/app/paper`
   - 点击"关于" → 应跳转到 `/about`

2. **测试二级菜单（股票分析）**
   - 展开"股票分析"菜单
   - 点击"单股分析" → 应跳转到 `/app/analysis/single`
   - 点击"批量分析" → 应跳转到 `/app/analysis/batch`
   - 点击"分析报告" → 应跳转到 `/app/reports`

3. **测试三级菜单（设置 - 个人设置）**
   - 展开"设置"菜单
   - 展开"个人设置"子菜单
   - 点击"通用设置" → 应跳转到 `/app/settings`（默认显示 general tab）
   - 点击"外观设置" → 应跳转到 `/app/settings?tab=appearance`
   - 点击"分析偏好" → 应跳转到 `/app/settings?tab=analysis`
   - 点击"通知设置" → 应跳转到 `/app/settings?tab=notifications`
   - 点击"安全设置" → 应跳转到 `/app/settings?tab=security`

4. **测试三级菜单（设置 - 系统配置）**
   - 展开"系统配置"子菜单
   - 点击"配置管理" → 应跳转到 `/app/settings/config`
   - 点击"缓存管理" → 应跳转到 `/app/settings/cache`

5. **测试三级菜单（设置 - 系统管理）**
   - 展开"系统管理"子菜单
   - 点击"数据库管理" → 应跳转到 `/app/settings/database`
   - 点击"操作日志" → 应跳转到 `/app/settings/logs`
   - 点击"系统日志" → 应跳转到 `/app/settings/system-logs`
   - 点击"多数据源同步" → 应跳转到 `/app/settings/sync`
   - 点击"定时任务" → 应跳转到 `/app/settings/scheduler`
   - 点击"使用统计" → 应跳转到 `/app/settings/usage`

## 预期行为

- ✅ 所有菜单项点击后应正确跳转到对应路由
- ✅ 带有 query 参数的菜单项应正确解析并跳转
- ✅ 深层嵌套菜单（三级菜单）应能正常展开和跳转
- ✅ 菜单激活状态应正确显示（高亮当前页面对应的菜单项）
- ✅ 页面切换时，只有右侧内容区域更新，布局组件不重新渲染

## 如果遇到问题

1. **菜单点击无反应**
   - 检查浏览器控制台是否有错误
   - 确认路由配置是否正确
   - 检查 `handleMenuSelect` 函数是否正确执行

2. **Query 参数未生效**
   - 检查 URL 是否正确包含 query 参数
   - 确认 Settings 组件的 `updateSectionFromRoute` 函数是否正确处理 query 参数

3. **菜单激活状态不正确**
   - 检查 `activeMenu` 计算属性是否正确计算当前路径
   - 确认路由路径是否与菜单项的 `index` 属性匹配

