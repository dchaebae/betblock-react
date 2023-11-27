import React from 'react'
import {
	Box,
} from '@mui/material'
import {
	BrowserRouter,
	Routes,
	Route
} from 'react-router-dom';
import HomePageHeader from './HomePageHeader'
import HomeLandingPage from './landing/HomeLandingPage'
import HomeAboutPage from './about/HomeAboutPage'

export default function HomePage({
	...props
}) {
	return (
		<Box sx={{display: 'flex', flexDirection: 'column'}}>
			<HomePageHeader />
			<BrowserRouter>
				<Routes>
					<Route path='/' exact element={<HomeLandingPage />} />
					<Route path='/about' element={<HomeAboutPage />} />
				</Routes>
			</BrowserRouter>
		</Box>
	)
}