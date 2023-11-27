import React from 'react'
import {
	Box,
	Typography,
} from '@mui/material';
// import {styled} from '@mui/material/styles';
import AppLandingPostNav from './AppLandingPostNav'

export default function AppLandingPost({...props}) {

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
			<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '5rem'}}>
				<Typography variant='h3' gutterBottom color="text.accent">Welcome to the Hub</Typography>
				<Typography variant='h5'>Begin your journey</Typography>
			</Box>

			<AppLandingPostNav/>
		</Box>
	)
}