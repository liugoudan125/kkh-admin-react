/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite',
				'bounce-slow': 'bounce 2s infinite'
			},
			colors: {
				primary: {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a'
				},
				success: {
					100: '#d1fae5',
					800: '#065f46'
				},
				warning: {
					100: '#fed7aa',
					800: '#92400e'
				},
				error: {
					100: '#fee2e2',
					800: '#991b1b'
				}
			}
		}
	},
	plugins: [],
	corePlugins: {
		preflight: false // 禁用预设样式，避免与 Ant Design 冲突
	}
}
