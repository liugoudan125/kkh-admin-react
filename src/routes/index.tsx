import { lazy, type FunctionComponent } from 'react'
import { createBrowserRouter } from 'react-router'

const router = createBrowserRouter([
	{
		Component: lazy(() => import('@/layout/BaseLayout')),
		children: [
			{
				path: '/',
				Component: lazy(() => import('@/pages/index'))
			},
			{
				path: 'demo',
				Component: lazy(() => import('@/layout/DemoLayout')),
				children: [
					{
						index: true,
						Component: lazy(() =>
							delay(() => import('@/pages/demo/index'), 3000)
						)
					},
					{
						path: 'loading',
						Component: lazy(() =>
							delay(() => import('@/pages/demo/loading'), 3000)
						)
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
