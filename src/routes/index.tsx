import { lazy, type FunctionComponent } from 'react'
import { createBrowserRouter } from 'react-router'
import AuthRouter from '@/components/AuthRouter'
import BaseLayout from '@/layout/BaseLayout'
const router = createBrowserRouter([
	{
		Component: () => {
			return (
				<AuthRouter>
					<BaseLayout />
				</AuthRouter>
			)
		},
		children: [
			{
				path: '/',
				Component: lazy(() => import('@/pages/index'))
			},
			{
				path: '/login',
				Component: lazy(() => import('@/pages/auth/LoginPage'))
			},
			{
				path: 'demo',
				Component: lazy(() => import('@/layout/DemoLayout')),
				children: [
					{
						index: true,
						Component: lazy(() => import('@/pages/demo/index'))
					},
					{
						path: 'loading',
						Component: lazy(() => import('@/pages/demo/loading'))
					}
				]
			}
		]
	}
])
export default router

function delay(importFn: () => Promise<any>, minDelay = 3000) {
	const p = new Promise((res) => {
		const c = importFn()
		setTimeout(() => {
			res(c)
		}, minDelay)
	})
	return p as Promise<{ default: FunctionComponent }>
}
