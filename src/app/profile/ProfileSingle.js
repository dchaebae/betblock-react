import React, {useState, useEffect} from 'react';
import {
	Paper,
	Box,
	Typography,
	Tooltip,
	IconButton,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {copyContent} from '../util'
import {useParams} from 'react-router-dom'
import Alert from '../../common/Alert'
import {format, parseISO} from 'date-fns'
import { publicMainnetClient } from '../ViemClient'
import {truncateAddress} from '../util'

const BackgroundBox = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	background: `radial-gradient(ellipse at 50% 50%, ${theme.palette.bg.primary} 20%, transparent 70%)`
}))

export default function ProfileSingle({
	...props
}) {
	const [openAlert, setOpenAlert] = useState(false)
	const [activities, setActivities] = useState([])
	const [meta, setMeta] = useState({})
	const [mainName, setMainName] = useState('')

	const {address} = useParams()

	const copyAddress = (e) => {
		copyContent(e, address);
		setOpenAlert(true)
	}

	const formattedJoin = () => {
		if (!meta?.joined) {
			return ''
		}
		return format(parseISO(meta.joined), 'PPP')
	}

	useEffect(() => {
		const load = async () => {
			// load activities based on address
			setActivities([])
			setMeta({joined: '2023-12-04T12:00:00Z'})
			await publicMainnetClient.getEnsName({address: address}).then((res) => {
				if (res) {
					setMainName(res)
				}
				else {
					setMainName(truncateAddress(address, 7, 5))
				}
			})
		}
		load()
	}, [address])

	return (
		<BackgroundBox sx={{mt: 5, mb: 10}}>
			<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
				<Paper elevation={1} sx={{p: 4, width: '100%'}}>
					<Box sx={{display: 'flex'}}>
						<Box sx={{width: '256px', height: '256px', backgroundColor: 'red'}}></Box>
						<Box sx={{display: 'flex', flexDirection: 'column', ml: 2}}>
							<Typography color='text.secondary'>{address}</Typography>
							<Box sx={{display: 'flex', alignItems: 'center'}}>
								<Typography variant='h5'>{mainName}</Typography>
								<Tooltip title={<Typography>Copy address</Typography>}>
									<IconButton onClick={(e) => copyAddress(e)} sx={{ml: 1}}><ContentCopyIcon/></IconButton>
								</Tooltip>
							</Box>
							{meta?.joined && <Typography>Joined {formattedJoin()}</Typography>}

						</Box>
					</Box>
				</Paper>
				<Paper elevation={1} sx={{p: 4, maxWidth: '750px', minWidth: '720px', mt: 3}}>
					<Box sx={{display: 'flex'}}>
						<Typography variant='h6'>Activity</Typography>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
						{activities.length === 0 && <Typography color='text.secondary' sx={{fontStyle: 'italic'}}>No activities yet!</Typography>}
					</Box>
				</Paper>
			</Box>
			<Alert open={openAlert} setOpen={setOpenAlert} alertMessage='Copied!' />
		</BackgroundBox>
	)
}