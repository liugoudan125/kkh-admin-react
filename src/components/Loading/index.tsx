import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingProps {
	/** 加载文本 */
	text?: string
	/** 组件大小 */
	size?: 'small' | 'default' | 'large'
	/** 是否占满容器 */
	fullScreen?: boolean
	/** 自定义样式类名 */
	className?: string
	/** 延迟显示加载状态的时间（毫秒） */
	delay?: number
}

const Loading: React.FC<LoadingProps> = ({
	text = '加载中...',
	size = 'default',
	fullScreen = false,
	className = '',
	delay = 0
}) => {
	// 自定义旋转图标
	const antIcon = (
		<LoadingOutlined
			className={`animate-spin ${
				size === 'small'
					? 'text-base'
					: size === 'large'
					? 'text-3xl'
					: 'text-xl'
			} text-primary-500`}
		/>
	)

	const containerClasses = `
    flex flex-col items-center justify-center
    ${fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'p-8'}
    ${className}
  `.trim()

	const textClasses = `
    mt-3 text-gray-600 font-medium
    ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}
    animate-pulse
  `.trim()

	return (
		<div className={containerClasses}>
			<Spin indicator={antIcon} size={size} delay={delay} />
			{text && <div className={textClasses}>{text}</div>}
		</div>
	)
}

// 预设的加载组件变体
export const PageLoading: React.FC<{ text?: string }> = ({
	text = '页面加载中...'
}) => <Loading text={text} size="large" fullScreen />

export const SectionLoading: React.FC<{ text?: string }> = ({
	text = '内容加载中...'
}) => <Loading text={text} size="default" className="min-h-48" />

export const ButtonLoading: React.FC = () => (
	<Loading text="" size="small" className="p-2" />
)

export default Loading
