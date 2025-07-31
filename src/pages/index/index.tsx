import { Button } from 'antd'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

const IndexPage: FC = () => {
	const navigate = useNavigate()
	return (
		<div>
			<h1>IndexPage</h1>
			<Button type="primary" onClick={() => navigate('/demo')}>
				to demo
			</Button>
		</div>
	)
}

export default IndexPage
