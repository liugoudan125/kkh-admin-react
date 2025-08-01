import { createContext, useReducer, type Dispatch } from 'react'

export type UserInfo = {
	id: string | null
	nickname: string | null
	avatar: string | null
	introduction: string | null
}

export type UserState = {
	id: string | null
	nickname: string | null
	avatar: string | null
	introduction: string | null
}

const initialState: UserState = {
	id: null,
	nickname: null,
	avatar: null,
	introduction: null
}

export type UserAction = {
	type: 'user-info' | 'logout'
	state?: Partial<UserState>
}

const reducer = (user: UserState, action: UserAction): UserState => {
	switch (action.type) {
		// 获取用户信息
		case 'user-info':
			return {
				...user,
				...action.state
			}
		// 退出登录
		case 'logout':
			return {
				...initialState
			}
		default:
			return user
	}
}

export const UserContext = createContext<UserState>(initialState)

export const UserDispatchContext = createContext<Dispatch<UserAction>>(() => {})

export function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<UserContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserContext.Provider>
	)
}
