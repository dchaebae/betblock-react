import React from 'react'
import {
	Box,
	Typography
} from '@mui/material';
import DataGrid from '../../common/DataGrid'
import {useNavigate} from 'react-router-dom'
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

export default function LeaderboardTable({
	...props
}) {

	let navigate = useNavigate()

	// slide open the details
  const handleRowClick = (params, event, details) => {
    // update the data as needed
    event.preventDefault()
    navigate('/profile/' + params.row.address)
  }

	return (
		<DataGrid
			rows={data}
			columns={columns}
			getRowId={(r) => r.rank}
			onRowClick={handleRowClick} />
	)
}