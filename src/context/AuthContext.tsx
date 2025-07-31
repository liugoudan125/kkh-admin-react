import { createContext, useReducer, type Dispatch } from 'react'

const initialState = {
	isAuthenticated: false,
	username: '',
	token: '',
	count: 0
}

export type AuthInfo = typeof initialState

export type AuthAction = {
	type: 'login' | 'getUserInfo' | 'logout' | 'increment' | 'decrement'
	state?: AuthInfo
}

const reducer = (authInfo: AuthInfo, action: AuthAction): AuthInfo => {
	switch (action.type) {
		//登录了
		case 'login':
			return {
				...authInfo,
				isAuthenticated: true
			}
		//获取用户信息
		case 'getUserInfo':
			return {
				...authInfo,
				username: action.state?.username ?? '',
				token: action.state?.token ?? ''
			}
		//退出登录
		case 'logout':
			return {
				...authInfo,
				isAuthenticated: false,
				username: '',
				token: ''
			}
		case 'increment':
			return {
				...authInfo,
				count: authInfo.count + 1
			}
		case 'decrement':
			return {
				...authInfo,
				count: authInfo.count - 1
			}
		default:
			return authInfo
	}
}

export const AuthContext = createContext<AuthInfo>(initialState)

export const AuthDispatchContext = createContext<Dispatch<AuthAction>>(() => {})

export function AuthContextProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<AuthContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthContext.Provider>
	)
}
