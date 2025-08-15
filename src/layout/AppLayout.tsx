import React, { useState, useEffect } from 'react'
import { FileOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router'

const { Sider } = Layout

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
	const location = useLocation()
	const [current, setCurrent] = useState<string>('/')

	const [currentMenu, setCurrentMenu] = useState<string>('')
	const [openKeys, setOpenKeys] = useState<string[]>([])
	useEffect(() => {
		const pathname = location.pathname

		// 设置选中的菜单项
		setCurrent(pathname)
		// 如果是子菜单项，自动展开父菜单
		// 查找所有父级菜单
		items.forEach((item: any) => {
			if (item?.children) {
				const hasChild = item.children.some((child: any) => child.key === pathname)
				if (hasChild) {
					setOpenKeys([item.key])
				}
				item.children?.forEach((child: any) => {
					if (child.key === pathname) {
						setCurrentMenu(child.label as string)
					}
				})
			}

			if (item.key === pathname) {
				setCurrentMenu(item.label as string)
			}
		})
	}, [location.pathname])

	return (
		<Layout className='h-full'>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<Menu
					className='h-full'
					theme='dark'
					mode='inline'
					items={items}
					selectedKeys={[current]}
					openKeys={openKeys}
					onClick={({ key }) => {
						setCurrent(key)
						navigate(key)
					}}
				/>
			</Sider>
			<div className='h-full flex flex-1 flex-col'>
				<div className='h-14 bg-white '></div>
				<div className='mt-2 ml-2'>{currentMenu}</div>
				<div className='flex-1 flex overflow-hidden m-2 flex-col rounded-xl'>
					<div
						className='flex-1 overflow-auto'
						style={{
							background: colorBgContainer,
							borderRadius: borderRadiusLG
						}}>
						<Outlet />
					</div>
				</div>
			</div>
		</Layout>
	)
}
