import useUserStore from '@/stores/userStore'
import { Button } from 'antd'
import { type FC } from 'react'
import { useNavigate } from 'react-router'
const IndexPage: FC = () => {
	const navigate = useNavigate()
	const user = useUserStore((state) => state.user)
	return (
		<div>
			<h1>IndexPage {user.nickname}</h1>
			<Button
				type='primary'
				onClick={() => {
					navigate('/demo')
				}}>
				to demo
			</Button>
		</div>
	)
}

export default IndexPage
