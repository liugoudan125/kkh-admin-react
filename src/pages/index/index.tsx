import { Button } from 'antd'
import { useContext, type FC } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '@/context/UserContext'
const IndexPage: FC = () => {
	const navigate = useNavigate()
	const user = useContext(UserContext)
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
