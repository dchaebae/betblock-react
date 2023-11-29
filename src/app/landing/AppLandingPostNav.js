import React, {useRef, useEffect} from 'react'
import {
	Box,
	Typography,
} from '@mui/material';
import HoverSelectionCard from '../../common/HoverSelectionCard'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import {
	BankAnimation,
	GameAnimation,
	CommunityAnimation
} from '../../lottie/LottieWraps'
import PolygonLogo from '../../images/PolygonLogo'

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
			<Grid md={4} sm={12} onMouseEnter={() => bankRef.current.goToAndPlay()} onMouseLeave={() => bankRef.current.goToAndStop(100, true)}>
				<HoverSelectionCard href="/lending" heading="Lending" subheading="Access Your Gateway to Game Funds">
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
				</HoverSelectionCard>
			</Grid>
			<Grid md={4} sm={12} onMouseEnter={() => gameRef.current.goToAndPlay(0)} onMouseLeave={() => gameRef.current.goToAndStop(100, true)}>
				<HoverSelectionCard href='/games' heading="Games" subheading="Dive into your Gaming Escape">
					<Box sx={{display: 'flex'}}>
						<Box sx={{flex: 1, py: 2}}>
							<Typography>Ready to play?</Typography>
						</Box>
						<Box sx={{flex: 1}}>
							<GameAnimation ref={gameRef} autoplay={false} />
						</Box>
					</Box>
				</HoverSelectionCard>
			</Grid>
			<Grid md={4} sm={12} onMouseEnter={() => communityRef.current.goToAndPlay(0)} onMouseLeave={() => communityRef.current.goToAndStop(100, true)}>
				<HoverSelectionCard href='/community' heading='Community' subheading='Forge Connections in Collective Play'>
					<Box sx={{display: 'flex'}}>
						<Box sx={{flex: 1, py: 2}}>
							<Typography>Check out other users on betblock!</Typography>
							<Typography sx={{mt: 1, fontSize: '1.6rem'}}>1,001,231 users</Typography>
						</Box>
						<Box sx={{flex: 1}}>
							<CommunityAnimation ref={communityRef} autoplay={false} />
						</Box>
					</Box>
				</HoverSelectionCard>
			</Grid>
		</Grid>
	)
}