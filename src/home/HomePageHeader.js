import React from 'react'
import {
	AppBar,
	Box,
	Typography,
	Slide,
	Link,
	useScrollTrigger,
} from '@mui/material'
import {
	styled,
	// alpha
} from '@mui/material/styles';
import BetblockLogo from '../images/BetblockLogo'
import Button from '../common/Button'

const TopNav = styled(AppBar)(({theme}) => ({
	alignItems: 'center',
	//backgroundColor: alpha(theme.palette.dark.bg, 0.8),
	backgroundColor: theme.palette.dark.bg,
	backgroundImage: 'none',
	boxShadow: '0px 1px 2px -1px rgba(0,0,0,0.2), 0px 2px 3px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
}))

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HomePageHeader({...props}) {

	const openApp = (e) => {
		e.preventDefault();
		if (process.env.NODE_ENV !== 'production') {
			window.open('http://app.localhost:3000', '_blank')
		}
		else {
			window.open('https://app.betblock.fi', '_blank')
		}
	}

	return (
		<HideOnScroll {...props}>
			<TopNav>
				<Box sx={{display: 'flex', flex: 1, alignItems: 'center', mx: '10rem', py: '1rem', maxWidth: '1200px', width: '100%'}}>
					<Link sx={{display: 'flex', alignItems: 'center'}} href="/" underline='none'>
						<BetblockLogo sx={{width: '35px'}} />
						<Typography sx={{fontWeight: 'bold', fontSize: '1.2rem', ml: 1}}>betblock</Typography>
					</Link>
					<Box sx={{flex: 1, ml: '5rem'}}>
						<Button variant='text' fontSize='1rem' href='/about'>About</Button>
					</Box>
					<Button fontSize='1rem' onClick={openApp}>Open App</Button>
				</Box>
			</TopNav>
		</HideOnScroll>
	)
}