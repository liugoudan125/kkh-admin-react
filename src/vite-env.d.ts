/// <reference types="vite/client" />

declare module '*.css' {
	const content: any
	export default content
}

interface ImportMetaEnv {
	readonly VITE_BASE_REQUEST_URL: string
	readonly VITE_REQUEST_TIMEOUT: number
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
