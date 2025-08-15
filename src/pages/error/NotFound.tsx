import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'
import { HomeOutlined, CompassOutlined } from '@ant-design/icons'

const NotFound: React.FC = () => {
	const navigate = useNavigate()

	const handleBackHome = () => {
		navigate('/')
	}

	const handleGoBack = () => {
		navigate(-1)
	}

	return (
		<div className='h-f flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='text-center px-4 py-8 max-w-2xl mx-auto'>
				{/* 404 大标题 */}
				<div className='relative mb-8'>
					<h1 className='text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse'>
						404
					</h1>
					<div className='absolute inset-0 flex items-center justify-center'>
						<CompassOutlined className='text-6xl text-gray-300 animate-spin-slow' />
					</div>
				</div>

				{/* 错误信息 */}
				<Result
					status='404'
					title={<span className='text-2xl font-semibold text-gray-800'>页面未找到</span>}
					subTitle={
						<span className='text-gray-600 mt-2 block'>
							抱歉，您访问的页面不存在。可能已被删除、名称已更改或暂时不可用。
						</span>
					}
					extra={
						<div className='flex flex-col sm:flex-row gap-3 justify-center mt-8'>
							<Button
								type='primary'
								size='large'
								icon={<HomeOutlined />}
								onClick={handleBackHome}
								className='shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 border-0 hover:from-blue-600 hover:to-blue-700'>
								返回首页
							</Button>
							<Button
								size='large'
								onClick={handleGoBack}
								className='shadow-md hover:shadow-lg transition-all duration-300'>
								返回上一页
							</Button>
						</div>
					}
				/>

				{/* 装饰性元素 */}
				<div className='mt-12 flex justify-center space-x-2'>
					<div
						className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
						style={{ animationDelay: '0ms' }}></div>
					<div
						className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
						style={{ animationDelay: '150ms' }}></div>
					<div
						className='w-2 h-2 bg-blue-400 rounded-full animate-bounce'
						style={{ animationDelay: '300ms' }}></div>
				</div>

				{/* 帮助提示 */}
				<div className='mt-12 text-sm text-gray-500'>
					<p>您可以尝试：</p>
					<ul className='mt-2 space-y-1'>
						<li>• 检查输入的网址是否正确</li>
						<li>• 返回首页重新导航</li>
						<li>• 联系系统管理员获取帮助</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default NotFound
