import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { UserContextProvider } from './context/UserContext'
import router from './routes'
import { RouterProvider } from 'react-router'
import { PageLoading } from './components/Loading'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserContextProvider>
			<Suspense fallback={<PageLoading text='应用初始化中...' />}>
				<RouterProvider router={router} />
			</Suspense>
		</UserContextProvider>
	</StrictMode>
)
