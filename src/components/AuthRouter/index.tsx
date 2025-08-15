import { getToken } from '@/lib/token-utils'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import request from '@/lib/request'
import useUserStore, { type UserType } from '@/stores/userStore'

/**
 * 权限路由
 * @param children
 */
export default function AuthRouter({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate()
	const location = useLocation()
	const user = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)
	useEffect(() => {
		// 如果token不存在，则跳转到登录页面
		const token = getToken()
		if (!token) {
			//如果当前页不是登录页面
			if (!location.pathname.startsWith('/login')) {
				navigate('/login?redirect=' + location.pathname)
			}
		}
		// 如果token存在，则跳转到首页
		if (token) {
			if (location.pathname.startsWith('/login')) {
				navigate('/')
			}
			// 如果用户信息不存在，则获取用户信息
			if (!user.id) {
				console.log('获取用户信息', location.pathname)
				request<UserType>('/sys/user/info', { method: 'GET' }).then((data) => {
					setUser(data)
				})
			}
		}
	}, [location])

	return children
}
