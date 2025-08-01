# Token 管理优化说明

## 概述

本项目优化了 Token 管理机制，确保页面刷新后能够自动从 localStorage 恢复 Token 到内存中，提供更好的用户体验。

## 主要特性

### 1. **自动 Token 恢复**

- 页面加载时自动从 localStorage/sessionStorage 恢复 Token
- 支持持久化和临时存储
- 内存和存储双重保障

### 2. **全局 Token 管理**

- 统一的 Token 存储和获取机制
- 支持全局变量和本地存储
- 自动同步内存和存储状态

### 3. **React Hook 支持**

- 提供 `useToken` Hook 方便在组件中使用
- 支持 Token 状态监听
- 提供完整的 Token 操作方法

## 核心功能

### Request 库中的 Token 管理

```typescript
import { setToken, clearToken, refreshToken } from '@/core/request'

// 设置 Token（自动保存到存储）
setToken('your-token-here', true) // 持久化存储
setToken('your-token-here', false) // 临时存储

// 清除 Token
clearToken()

// 刷新 Token（从存储中重新加载）
const token = refreshToken()
```

### useToken Hook

```typescript
import { useToken } from '@/hooks/useToken'

const MyComponent = () => {
  const {
    token,           // 当前 Token
    loading,         // 加载状态
    setToken,        // 设置 Token
    clearToken,      // 清除 Token
    refreshToken,    // 刷新 Token
    hasToken         // 检查是否有 Token
  } = useToken()

  // 使用示例
  const handleLogin = (token: string) => {
    setToken(token, true) // 持久化存储
  }

  const handleLogout = () => {
    clearToken()
  }

  return (
    <div>
      {loading ? '加载中...' : hasToken() ? '已登录' : '未登录'}
    </div>
  )
}
```

## 工作流程

### 1. **页面初始化**

```
页面加载 → 检查 localStorage → 恢复 Token 到内存 → 更新状态
```

### 2. **登录流程**

```
用户登录 → 获取 Token → 保存到内存和存储 → 更新认证状态
```

### 3. **页面刷新**

```
页面刷新 → 自动从存储恢复 Token → 保持登录状态 → 无需重新登录
```

### 4. **登出流程**

```
用户登出 → 清除内存和存储中的 Token → 更新认证状态
```

## 配置说明

### 存储键名配置

```typescript
// src/core/config.ts
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  // ... 其他键名
}
```

### 环境变量支持

```bash
# 可以通过环境变量配置 Token 相关设置
VITE_TOKEN_PERSISTENT=true
VITE_TOKEN_EXPIRE_TIME=7200
```

## 使用示例

### 在登录页面中使用

```typescript
import { useToken } from '@/hooks/useToken'
import { post } from '@/core/request'

const LoginPage = () => {
  const { setToken } = useToken()

  const handleLogin = async (values: LoginForm) => {
    try {
      const response = await post('/auth/login', {
        username: values.username,
        password: values.password
      })

      if (response.status) {
        // 设置 Token（持久化存储）
        setToken(response.data.token, true)
        // 跳转到主页
      }
    } catch (error) {
      console.error('登录失败:', error)
    }
  }

  return (
    // 登录表单
  )
}
```

### 在受保护的路由中使用

```typescript
import { useToken } from '@/hooks/useToken'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useToken()

  if (loading) {
    return <div>加载中...</div>
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

## 最佳实践

### 1. **Token 安全性**

- 使用 HTTPS 传输
- 设置合适的过期时间
- 定期刷新 Token

### 2. **用户体验**

- 页面刷新后保持登录状态
- 提供自动登录功能
- 优雅的错误处理

### 3. **性能优化**

- 使用内存缓存减少存储访问
- 延迟加载 Token 信息
- 避免不必要的状态更新

## 故障排除

### Token 丢失问题

1. 检查 localStorage 是否被清除
2. 确认 Token 设置是否成功
3. 验证存储权限

### 页面刷新后未恢复

1. 确认 Token 是否正确保存
2. 检查初始化逻辑
3. 验证存储键名配置

### 跨标签页同步

1. 使用 Storage 事件监听
2. 实现多标签页 Token 同步
3. 处理并发登录情况
