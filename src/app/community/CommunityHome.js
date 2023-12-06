import React, {useState} from 'react'
import {
	Box,
	Typography,
	InputBase,
	Paper,
	Autocomplete
} from '@mui/material';
import LeaderboardTable from './LeaderboardTable'
import ArtGallery from '../../home/landing/ArtGallery'
import {styled, alpha} from '@mui/material/styles';

const BackgroundBox = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	background: `radial-gradient(ellipse at 50% 50%, ${theme.palette.bg.primary} 20%, transparent 70%)`
}))

const SearchField = styled(InputBase)(({theme}) => ({
  borderRadius: 100,
  border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
  color: alpha(theme.palette.text.primary, 0.7),
  backgroundColor: theme.palette.dark.card,
  '&:hover': {
    border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
    color: theme.palette.text.primary,
  }, 
  '& .MuiInputBase-input': {
    padding: '4px 12px'
  }
}))

export default function CommunityHome({
	...props
}) {

	const [searchInput, setSearchInput] = useState('')

	const onSearchChange = (e) => {
		setSearchInput(e.target.value)
	}

	return (
		<BackgroundBox sx={{mt: 5, pb: 10}}>
			<Box sx={{width: '50%'}}>
				<SearchField
					fullWidth
					placeholder='Search address or ENS of player'
					value={searchInput}
					onChange={(e) => onSearchChange(e)} />
			</Box>

			<Box sx={{height: '400px', minWidth: '55rem', mt: 4}}>
				<Typography variant='h6' sx={{ml: 4}}>Featured Profiles</Typography>
				<ArtGallery/>
			</Box>
			<Paper elevation={1} sx={{mt: '24px', width: '50%', minHeight: '500px', zIndex: 5}}>
				<Box sx={{display: 'flex', mx: 2, mt: 4}}>
					<Typography variant='h6'>Leaderboard</Typography>
				</Box>
				<Box sx={{m: 1}}>
					<LeaderboardTable/>
				</Box>
			</Paper>
		</BackgroundBox>
	)
}