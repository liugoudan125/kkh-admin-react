import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'

export default function Demo() {
	const authInfo = useContext(AuthContext)

	return (
		<div>
			<h1>Demo</h1>
			<ul className="w-4xl border p-4  box-border">
				<li className="overflow-hidden text-wrap wrap-break-word">
					name: {authInfo.username}
				</li>
				<li className="text-wrap wrap-break-word text-ellipsis line-clamp-3">
					token: {authInfo.token}
				</li>
				<li>count: {authInfo.count}</li>
			</ul>
		</div>
	)
}
