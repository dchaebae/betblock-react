import React from 'react'
import {
	Box,
	Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
//import {truncateAddress} from '../util'
import currency from 'currency.js'

const data = [
	{'rank': 1, 'address': '0xd225C4BD12B7a4C7b1d66a2c9C20C581bBF5361e', gamesPlayed: 16126},
	{'rank': 2, 'address': '0xd225C4BD12B7a4C7b1d66a2c9C20C581bBF5361e', gamesPlayed: 11}
]

const columns = [
	{field: 'rank', 'headerName': 'Rank', renderCell: (params) => (
		<Box>
			<Typography>#{params.value}</Typography>
		</Box>
	)},
	{field: 'address', 'headerName': 'Address', flex: 1, renderCell: (params) => (
		<Box>
			<Typography>{params.value.toLowerCase()}</Typography>
		</Box>
	)},
	{field: 'gamesPlayed', 'headerName': 'Play Count', renderCell: (params) => (
		<Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
			<Typography>{currency(params.value, {'pattern': '#', precision: 0}).format()}</Typography>
		</Box>
	)}
]

export default function AppLandingPostTable({
	...props
}) {

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', height: '400px', mx: 10, mt: 10}}>
			<Box sx={{display: 'flex', flexDirection: 'column'}}>
				<Typography variant='h4'>Leaderboard</Typography>
				<Typography color="text.secondary" gutterBottom>Your top betblock winners</Typography>
			</Box>
			<DataGrid rows={data} columns={columns} getRowId={(r) => r.rank} />
		</Box>
	)
}