import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import AuthRouter from '@/components/AuthRouter'
import BaseLayout from '@/layout/BaseLayout'
const router = createBrowserRouter([
	{
		path: '/',
		Component: () => {
			return (
				<AuthRouter>
					<BaseLayout />
				</AuthRouter>
			)
		},
		children: [
			{
				path: '/login',
				Component: lazy(() => import('@/pages/auth/LoginPage'))
			},
			{
				Component: lazy(() => import('@/layout/AppLayout')),
				children: [
					{
						index: true,
						Component: lazy(() => import('@/pages/demo/index'))
					},
					{
						path: 'loading',
						Component: lazy(() => import('@/pages/demo/loading'))
					},
					{
						path: '*',
						Component: lazy(() => import('@/pages/error/NotFound'))
					}
				]
			}
		]
	}
])
export default router
