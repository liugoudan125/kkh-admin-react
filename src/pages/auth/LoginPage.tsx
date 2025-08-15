import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import request from '@/lib/request'
import { setToken } from '@/lib/token-utils'
import { useNavigate, useLocation } from 'react-router'
const { Title } = Typography

interface LoginForm {
	username: string
	password: string
}

const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const redirect = searchParams.get('redirect')
	const onFinish = async (values: LoginForm) => {
		setLoading(true)
		request<string>('/sys/login/username', {
			method: 'POST',
			body: {
				identifier: values.username,
				accessToken: values.password
			}
		})
			.then((data) => {
				message.success('登录成功')
				setToken(data)
				navigate(redirect || '/')
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
			<Card className='w-full max-w-md shadow-xl'>
				<div className='text-center mb-8'>
					<Title
						level={2}
						className='text-gray-800 mb-2'>
						KKH后台管理
					</Title>
					<p className='text-gray-500'>请登录您的账户</p>
				</div>

				<Form
					name='login'
					onFinish={onFinish}
					autoComplete='off'
					layout='vertical'
					size='large'>
					<Form.Item
						name='username'
						label='用户名'
						rules={[
							{
								required: true,
								message: '请输入用户名！'
							}
						]}>
						<Input
							prefix={<UserOutlined className='text-gray-400' />}
							placeholder='请输入用户名'
						/>
					</Form.Item>

					<Form.Item
						name='password'
						label='密码'
						rules={[
							{
								required: true,
								message: '请输入密码！'
							},
							{
								min: 6,
								message: '密码长度不能少于6位！'
							}
						]}>
						<Input.Password
							prefix={<LockOutlined className='text-gray-400' />}
							placeholder='请输入密码'
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							loading={loading}
							className='w-full h-12 text-base'>
							登录
						</Button>
					</Form.Item>
				</Form>

				<div className='text-center text-gray-500 text-sm'>
					<p>默认用户名：admin</p>
					<p>默认密码：123456</p>
				</div>
			</Card>
		</div>
	)
}

export default LoginPage
