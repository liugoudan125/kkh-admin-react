import { PageLoading } from '@/components/Loading'
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'

export default function BaseLayout() {
	const location = useLocation()
	return (
		<Suspense fallback={<PageLoading />}>
			<Outlet key={location.key} />
		</Suspense>
	)
}
