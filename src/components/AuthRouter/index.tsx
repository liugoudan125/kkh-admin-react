import { getToken } from '@/core/token-utils'
import { useContext, useEffect } from 'react'
import { UserContext, UserDispatchContext, type UserState } from '@/context/UserContext'
import { useLocation, useNavigate } from 'react-router'
import request from '@/core/request'

/**
 * 权限路由
 * @param children
 */
export default function AuthRouter({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate()
	const location = useLocation()
	const user = useContext(UserContext)
	const dispatch = useContext(UserDispatchContext)
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
				request<UserState>('/sys/user/info', { method: 'GET' }).then((data) => {
					dispatch({ type: 'user-info', state: data })
				})
			}
		}
	}, [location])

	return children
}
