import { useContext } from 'react'
import { AuthDispatchContext, AuthContext } from './context/AuthContext'
import Demo from '@/components/Demo'
import { Button } from 'antd'

function App() {
	const authInfo = useContext(AuthContext)
	const dispatch = useContext(AuthDispatchContext)

	return (
		<>
			<Demo />
			<ul>
				<li>name: {authInfo.username}</li>
				<li>token: {authInfo.token}</li>
			</ul>
			<form>
				<input
					className="border"
					type="text"
					name="username"
					value={authInfo?.username ?? ''}
					onInput={(e) => {
						e.preventDefault()
						let value = e.currentTarget.value
						if (value && value.length > 100) {
							value = value.slice(0, 100)
						}
						dispatch({
							type: 'getUserInfo',
							state: {
								...authInfo,
								username: value
							}
						})
					}}
				/>
				<br />
				<input
					className="border"
					type="text"
					name="token"
					value={authInfo.token}
					onInput={(e) => {
						e.preventDefault()
						let value = e.currentTarget.value
						if (value && value.length > 9999) {
							value = value.slice(0, 9999)
						}
						dispatch({
							type: 'getUserInfo',
							state: {
								...authInfo,
								token: value
							}
						})
					}}
				/>
				<br />
				<Button
					className="mr-2"
					type="primary"
					onClick={() => {
						dispatch({
							type: 'increment'
						})
					}}
				>
					加
				</Button>
				<Button
					type="primary"
					onClick={() => {
						dispatch({
							type: 'decrement'
						})
					}}
				>
					减
				</Button>
			</form>
		</>
	)
}

export default App
