import React from 'react'
import Loading from './Loading'

// 预设的加载组件变体
export const PageLoading: React.FC<{ text?: string }> = ({ text = '页面加载中...' }) => (
	<Loading text={text} size='large' fullScreen />
)

export const SectionLoading: React.FC<{ text?: string }> = ({ text = '内容加载中...' }) => (
	<Loading text={text} size='default' className='min-h-48' />
)

export const ButtonLoading: React.FC = () => <Loading text='' size='small' className='p-2' />

export default Loading
