import React, { useState } from 'react'
import {
	DesktopOutlined,
	FileOutlined,
	HomeOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label
	} as MenuItem
}

const items: MenuItem[] = [
	// getItem('Option 1', '1', <PieChartOutlined />),
	// getItem('Option 2', '2', <DesktopOutlined />),
	// getItem('User', 'sub1', <UserOutlined />, [
	// 	getItem('Tom', '3'),
	// 	getItem('Bill', '4'),
	// 	getItem('Alex', '5')
	// ]),
	// getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	// getItem('Files', '9', <FileOutlined />)
	getItem('首页', '/', <HomeOutlined />),
	getItem('用户管理', '/user', <UserOutlined />, [
		getItem('权限管理', '/user/permission', <FileOutlined />),
		getItem('日志管理', '/user/log', <FileOutlined />),
		getItem('系统管理', '/user/system', <FileOutlined />),
		getItem('系统设置', '/user/setting', <FileOutlined />)
	]),
	getItem('角色管理', '/loading', <TeamOutlined />)
]
export default function AppLayout() {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken()
	const navigate = useNavigate()

	const [selectedKeys, setSelectedKeys] = useState(['/'])

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className='demo-logo-vertical' />
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={selectedKeys}
					items={items}
					onClick={({ item, key, keyPath, domEvent }) => {
						console.log('item', item)
						console.log('key', key)
						console.log('keyPath', keyPath)
						console.log('domEvent', domEvent)
						navigate(key)
						setSelectedKeys(keyPath)
					}}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}></Header>
				<Content className='flex-1 flex overflow-auto m-4 flex-col rounded-2xl'>
					<Breadcrumb
						style={{ margin: '16px 0' }}
						items={[{ title: 'User' }, { title: 'Bill' }]}
					/>
					<div
						className='flex-1 overflow-auto'
						style={{
							background: colorBgContainer,
							borderRadius: borderRadiusLG
						}}>
						<Outlet />
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}
