import { Route, Routes, Navigate } from 'react-router-dom'
import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/index'))

function RouteConfig() {
	return (
		<Routes>
			<Route path="/home" element={<Home />}></Route>
			<Route path="/" element={<Navigate replace to="/home" />} />
		</Routes>
	)
}

export default RouteConfig;