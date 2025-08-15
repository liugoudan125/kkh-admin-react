import { STORAGE_KEYS } from '@/lib/constant'
type TokenState = {
	token: string | null
}
const state: TokenState = {
	token: null
}

export const setToken = (token: string) => {
	state.token = token
	localStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

export const getToken = () => {
	if (state.token) {
		return state.token
	}
	const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
	if (token) {
		state.token = token
	}
	return state.token
}

export const clearToken = () => {
	state.token = null
	localStorage.removeItem(STORAGE_KEYS.TOKEN)
}
