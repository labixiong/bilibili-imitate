import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/index'))
const PostFile = lazy(() => import('../pages/PostFile/index'))
const Login = lazy(() => import('../pages/Login/index'))
const Personal = lazy(() => import('../pages/Personal/index'))
const Purchase = lazy(() => import('../pages/Purchase/index'))

function RouteConfig() {
	return (
		<Routes>
			<Route path="/home" element={<Home />}></Route>
			<Route path="/" element={<Navigate replace to="/home" />} />
			<Route path="/login" element={<Login />} />
			<Route path="/postfile" element={<PostFile />} />
			<Route path="/personal" element={<Personal />} />
			<Route path="/purchase" element={<Purchase />} />
		</Routes>
	)
}

export default RouteConfig;