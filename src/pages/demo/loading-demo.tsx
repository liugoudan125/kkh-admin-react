import { useState } from 'react'
import { Card, Button, Space, Divider } from 'antd'
import Loading, {
	PageLoading,
	SectionLoading,
	ButtonLoading
} from '../../components/Loading'

export default function Index() {
	const [showPageLoading, setShowPageLoading] = useState(false)
	const [buttonLoading, setButtonLoading] = useState(false)

	const handleButtonClick = () => {
		setButtonLoading(true)
		setTimeout(() => setButtonLoading(false), 2000)
	}

	const handlePageLoading = () => {
		setShowPageLoading(true)
		setTimeout(() => setShowPageLoading(false), 3000)
	}

	return (
		<div className="p-6 max-w-4xl mx-auto overflow-auto">
			<h1 className="text-3xl font-bold text-gray-800 mb-8 ">
				Loading 组件示例
			</h1>

			{/* 全屏加载 */}
			{showPageLoading && <PageLoading text="页面加载中，请稍候..." />}

			<Space direction="vertical" size="large" className="w-full">
				{/* 基础用法 */}
				<Card title="基础 Loading" className="w-full">
					<Space
						direction="vertical"
						size="middle"
						className="w-full"
					>
						<div>
							<h3 className="text-lg font-semibold mb-3">
								不同大小
							</h3>
							<Space size="large" align="center">
								<div className="text-center">
									<Loading size="small" text="小尺寸" />
								</div>
								<div className="text-center">
									<Loading size="default" text="默认尺寸" />
								</div>
								<div className="text-center">
									<Loading size="large" text="大尺寸" />
								</div>
							</Space>
						</div>

						<Divider />

						<div>
							<h3 className="text-lg font-semibold mb-3">
								仅图标
							</h3>
							<Loading text="" size="default" />
						</div>
					</Space>
				</Card>

				{/* 区域加载 */}
				<Card title="区域 Loading" className="w-full">
					<SectionLoading text="区域内容加载中..." />
				</Card>

				{/* 按钮加载 */}
				<Card title="按钮 Loading" className="w-full">
					<Space size="middle">
						<Button
							type="primary"
							loading={buttonLoading}
							onClick={handleButtonClick}
						>
							{buttonLoading ? <ButtonLoading /> : '点击加载'}
						</Button>
						<Button onClick={handlePageLoading}>
							显示全屏加载
						</Button>
					</Space>
				</Card>

				{/* 自定义样式 */}
				<Card title="自定义样式" className="w-full">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
							<Loading
								text="自定义背景"
								size="large"
								className="min-h-32"
							/>
						</div>
						<div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
							<Loading
								text="等待数据..."
								size="default"
								className="min-h-32"
							/>
						</div>
					</div>
				</Card>
			</Space>
		</div>
	)
}
