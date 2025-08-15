import { create } from 'zustand'

export type UserType = {
	id: string | null
	nickname: string | null
	avatar: string | null
	introduction: string | null
}

type UserState = {
	user: UserType
	setUser: (user: UserType) => void
	logout: () => void
}

const useUserStore = create<UserState>((set) => ({
	user: {
		id: null,
		nickname: null,
		avatar: null,
		introduction: null
	},
	setUser: (user: UserType) => set((state) => ({ ...state, user })),
	logout: () => set({ user: { id: null, nickname: null, avatar: null, introduction: null } })
}))

export default useUserStore
