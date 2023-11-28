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
import PolygonLogo from '../../images/PolygonLogo'

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
		if (bankRef.current) {
			bankRef.current.goToAndStop(100, true);
			bankRef.current.setSpeed(2)
		}
		if (gameRef.current) {
			gameRef.current.goToAndStop(114, true);
			gameRef.current.setSpeed(2);
		}
		
		if (communityRef.current) {
			communityRef.current.goToAndStop(124, true);
			communityRef.current.setSpeed(2)	
		}
		
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
									<Box sx={{flex: 1, py: 2}}>
										<Box sx={{display: 'flex', flexDirection: 'column'}}>
											<Typography>Some description here</Typography>
											<Box sx={{display: 'flex', mt: 1, alignItems: 'center'}}>
												<PolygonLogo sx={{width: '30px', height: '100%'}} id='matic' simple={+true} />
												<Typography sx={{mt: 1, fontSize: '1.6rem', ml: 1}} gutterBottom>$XXX.XX</Typography>
											</Box>
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
									<Box sx={{flex: 1, py: 2}}>
										<Typography>Ready to play?</Typography>
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
			<Grid md={4} xs={12} onMouseEnter={() => communityRef.current.goToAndPlay(0)} onMouseLeave={() => communityRef.current.goToAndStop(100, true)}>
				<Tooltip title={<Typography>See who else has been playing at betblock</Typography>}>
					<Link sx={{textDecoration: 'none'}} href='/community'>
						<HoverCard>
							<CardContent>
								<Typography color="text.secondary" gutterBottom>Some description goes here</Typography>
								<Typography variant="h5" color="text.accent">Community</Typography>
								<Box sx={{display: 'flex'}}>
									<Box sx={{flex: 1, py: 2}}>
										<Typography>Check out other users on betblock!</Typography>
										<Typography sx={{mt: 1, fontSize: '1.6rem'}}>1,001,231 users</Typography>
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