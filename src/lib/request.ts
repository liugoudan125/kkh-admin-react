import { clearToken, getToken } from '@/lib/token-utils'
const BASE_URL = import.meta.env.VITE_BASE_REQUEST_URL
const TIMEOUT = import.meta.env.VITE_REQUEST_TIMEOUT
console.log('TIMEOUT:', TIMEOUT)
console.log('env:', import.meta.env)

import { message } from 'antd'
export type RequestOptions = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	body?: any
	headers?: Record<string, string>
	query?: Record<string, string>
}
export type Response<T> = {
	status: boolean
	errorMessage: string | null
	data: T | null
	extra: Record<string, any> | null
}

const request = <T>(url: string, options: RequestOptions): Promise<T> => {
	const init: RequestInit = {
		method: options.method
	}
	// 拼接url
	let requestUrl = `${BASE_URL}${url}`

	// 拼接query
	if (options.query) {
		requestUrl += `?${new URLSearchParams(options.query).toString()}`
	}

	// 设置headers
	let headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...options.headers
	}
	// 设置token
	const token = getToken()
	if (token) {
		headers.token = token || ''
	}
	init.headers = new Headers(headers)

	// 设置body
	let bodyJson: string | null = null
	if (options.body) {
		bodyJson = JSON.stringify(options.body)
	}
	if (bodyJson) {
		init.body = bodyJson
	}

	// 设置abort超时
	const controller = new AbortController()
	const signal = controller.signal
	init.signal = signal
	const timeout = setTimeout(() => {
		controller.abort()
	}, TIMEOUT * 1000)

	// 发送请求
	return fetch(requestUrl, init)
		.then((response) => {
			if (response.status === 200) {
				return response.json()
			}
			return Promise.reject(response)
		})
		.then((data) => {
			if (data.code === 200) {
				return data.data
			} else {
				if (data.extra && data.extra.code === 401) {
					message.error('登录过期，请重新登录')
					clearToken()
					window.location.href = '/login?redirect=' + window.location.pathname
					throw new Error('登录过期，请重新登录')
				}
			}
			throw new Error(data.errorMessage || '请求失败')
		})
		.catch((error) => {
			console.log('error:', error)

			if (error instanceof DOMException && error.name === 'AbortError') {
				message.error('请求超时')
			} else if (error instanceof Error) {
				message.error(error.message)
			} else if (error instanceof Response) {
				message.error(error.statusText)
			}
			return Promise.reject(error)
		})
		.finally(() => {
			clearTimeout(timeout)
		})
}

export default request
