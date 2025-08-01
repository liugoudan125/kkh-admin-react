# API 代理配置说明

## 概述

本项目使用 Vite 的代理功能，将前端的 `/api` 请求代理到后端服务器 `localhost:8080`。

## 配置详情

### Vite 代理配置

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 配置说明

- **target**: 代理目标地址 `http://localhost:8080`
- **changeOrigin**: 设置为 `true`，改变请求头中的 Origin
- **secure**: 设置为 `false`，允许不安全的 HTTPS 连接
- **rewrite**: 重写路径，移除 `/api` 前缀

## 请求流程

1. 前端发起请求：`/api/users`
2. Vite 代理拦截请求
3. 重写路径为：`/users`
4. 转发到：`http://localhost:8080/users`

## 使用示例

```typescript
import { get, post } from '@/core/request'

// 这些请求会被代理到 localhost:8080
const users = await get('/users')           // → http://localhost:8080/users
const user = await get('/users/1')          // → http://localhost:8080/users/1
const result = await post('/auth/login', {  // → http://localhost:8080/auth/login
  username: 'admin',
  password: '123456'
})
```

## 环境变量配置

可以通过环境变量自定义 API 基础 URL：

```bash
# .env.development
VITE_API_BASE_URL=/api

# .env.production
VITE_API_BASE_URL=https://api.example.com/api
```

## 注意事项

1. **开发环境**: 使用 Vite 代理，请求会被转发到 `localhost:8080`
2. **生产环境**: 需要配置正确的 API 地址
3. **CORS**: 开发环境下不需要处理跨域问题
4. **路径重写**: `/api` 前缀会被自动移除

## 故障排除

### 代理不生效

1. 检查后端服务是否在 `localhost:8080` 运行
2. 确认 Vite 开发服务器已重启
3. 检查网络请求是否正确发送

### 404 错误

1. 确认后端接口路径是否正确
2. 检查路径重写规则是否合适
3. 验证后端服务是否正常运行
