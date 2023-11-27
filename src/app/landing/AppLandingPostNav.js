import React, {useRef, useEffect} from 'react'
import {
	Box,
	Typography,
	Card,
	CardContent,
	Link,
	Tooltip,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {
	BankAnimation,
	GameAnimation,
	CommunityAnimation
} from '../../lottie/LottieWraps'

const HoverCard = styled(Card)(({theme}) => ({
	display: 'flex',
	border: '1px solid transparent',
	'&:hover': {
		backgroundColor: theme.palette.action.hover,
		cursor: 'pointer',
	}
}))

export default function AppLandingPostNav({...props}) {
	let bankRef = useRef()
	let communityRef = useRef()
	let gameRef = useRef()

	useEffect(() => {
		bankRef.current.goToAndStop(100, true);
		gameRef.current.goToAndStop(114, true);
		communityRef.current.goToAndStop(124, true);
	}, [])

	return (
		<Grid container spacing={2} sx={{mt: '5rem', mx: 10, }}>
			<Grid md={4} xs={12} onMouseEnter={() => bankRef.current.goToAndPlay()} onMouseLeave={() => bankRef.current.goToAndStop(100, true)}>
				<Tooltip title={<Typography>Currently supporting MATIC collateral lending. If you already have USDC, you can go ahead and play!</Typography>}>
					<Link sx={{textDecoration: 'none'}} href='/lending'>
						<HoverCard>
							<CardContent>
								<Typography color="text.secondary" gutterBottom>Some description goes here</Typography>
								<Typography variant="h5" color="text.accent">Lending</Typography>
								<Box sx={{display: 'flex'}}>
									<Box sx={{flex: 1}}>
										<Box sx={{}}>
											
										</Box>
									</Box>
									<Box sx={{flex: 1}}>
										<BankAnimation ref={bankRef} autoplay={false} />
									</Box>
								</Box>
							</CardContent>
						</HoverCard>
					</Link>
				</Tooltip>
			</Grid>
			<Grid md={4} xs={12} onMouseEnter={() => gameRef.current.goToAndPlay(0)} onMouseLeave={() => gameRef.current.goToAndStop(100, true)}>
				<Tooltip title={<Typography>Now play roulette! Based on the outcome of your game, your profile NFT will morph</Typography>}>
					<Link sx={{textDecoration: 'none'}} href='/games'>
						<HoverCard>
							<CardContent>
								<Typography color="text.secondary" gutterBottom>Some description goes here</Typography>
								<Typography variant="h5" color="text.accent">Games</Typography>
								<Box sx={{display: 'flex'}}>
									<Box sx={{flex: 1}}>
										
									</Box>
									<Box sx={{flex: 1}}>
										<GameAnimation ref={gameRef} autoplay={false} />
									</Box>
								</Box>
							</CardContent>
						</HoverCard>
					</Link>
				</Tooltip>
			</Grid>
			<Grid md={4} xs={12} onMouseEnter={() => communityRef.current.goToAndPlay()} onMouseLeave={() => communityRef.current.goToAndStop(100, true)}>
				<Tooltip title={<Typography>See who else has been playing at betblock</Typography>}>
					<Link sx={{textDecoration: 'none'}} href='/community'>
						<HoverCard>
							<CardContent>
								<Typography color="text.secondary" gutterBottom>Some description goes here</Typography>
								<Typography variant="h5" color="text.accent">Community</Typography>
								<Box sx={{display: 'flex'}}>
									<Box sx={{flex: 1}}>
										
									</Box>
									<Box sx={{flex: 1}}>
										<CommunityAnimation ref={communityRef} autoplay={false} />
									</Box>
								</Box>
							</CardContent>
						</HoverCard>
					</Link>
				</Tooltip>
			</Grid>
		</Grid>
	)
}