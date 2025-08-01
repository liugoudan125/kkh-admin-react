import { SectionLoading } from '@/components/Loading'
import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router'

export default function DemoLayout() {
	const location = useLocation()
	return (
		<>
			<div className="h-16 w-full flex justify-center items-center gap-4">
				<Nav to="/demo">demo index</Nav>
				<Nav to="/demo/loading">loading</Nav>
			</div>
			<div className="flex-1 overflow-auto">
				<Suspense fallback={<SectionLoading />}>
					<Outlet key={location.key} />
				</Suspense>
			</div>
		</>
	)
}

function Nav({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<NavLink className="border px-2 py-1 rounded-2xl" to={to}>
			{children}
		</NavLink>
	)
}
