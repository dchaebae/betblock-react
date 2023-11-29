import React from 'react'
import {
	Box,
	Typography,
	IconButton,
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import UndoIcon from '@mui/icons-material/Undo';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import currency from 'currency.js'
import TextFieldCurrency from '../../common/TextFieldCurrency'
import Button from '../../common/Button'
import {rouletteTutorial, rouletteOdds} from './tutorials'

const TooltipWide = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 800,
  },
});

function GridInside({
	insideNumber = -1, // must define this
	topEdge = false,
	red = false,
	...props
}) {
	return (
		<ParentSize>
			{({width}) => 
				<Box sx={{display: 'flex', alignItems: 'stretch',
					width: width, height: topEdge ? width + 10 : width,
					...(red && {backgroundColor: (theme) => theme.palette.game.red})}}>
					<Box sx={{display: 'flex', flexDirection: 'column', width: '10px'}} id='left-edge'>
						{topEdge && <Box sx={{height: '10px', backgroundColor: (theme) => theme.palette.dark.card}}></Box>}
						<Box sx={{flex: 1, backgroundColor: (theme) => theme.palette.dark.card, cursor: 'pointer'}} id='left-split-bet'/>
						<Box sx={{height: '10px', backgroundColor: (theme) => theme.palette.dark.card, cursor: 'pointer'}} id='left-corner-bet'/>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
						{topEdge && <Box sx={{height: '10px', backgroundColor: (theme) => theme.palette.dark.card}}></Box>}
						<Box sx={{flex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} id='straight-bet'>
							<Typography variant='h5'>{insideNumber}</Typography>
						</Box>
						<Box sx={{flex: 1, backgroundColor: (theme) => theme.palette.dark.card, maxHeight: '10px', minHeight: '10px', cursor: 'pointer'}} id='bottom-split-bet'/>
					</Box>
				</Box>
			}
		</ParentSize>
	)
}

function GridZero({
	...props
}) {
	return (
		<ParentSize>
			{({width, height}) => 
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
					width: width, height: height, cursor: 'pointer',
					clipPath: 'polygon(100% 0%, 100% 100%, 40% 100%, 0% 50%, 40% 0%)',
					backgroundColor: (theme) => theme.palette.game.green}}>
					<Typography variant='h5'>0</Typography>
				</Box>
			}
		</ParentSize>
	)
}

function GridDozenBet({
	topCard = false,
	bottomCard = false,
	...props
}) {
	return (
		<ParentSize style={{height: '100%'}}>
			{({width, height}) => 
				<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',
					width: width, height: height, cursor: 'pointer',
					backgroundColor: (theme) => theme.palette.dark.button,
					borderTop: (theme) => `${topCard ? 10 : 5}px solid ${theme.palette.dark.card}`,
					borderBottom: (theme) => `${bottomCard ? 10 : 5}px solid ${theme.palette.dark.card}`,
					borderRight: (theme) => '10px solid ' + theme.palette.dark.card,
					borderLeft: (theme) => '10px solid ' + theme.palette.dark.card}}>
					<Typography variant='h5'>2 To 1</Typography>
				</Box>
			}
		</ParentSize>
	)
}

function GridOutsideBet({
	rightCard = false,
	...props
}) {
	return (
		<Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2, cursor: 'pointer',
			backgroundColor: (theme) => theme.palette.dark.button,
			borderBottom: (theme) => '10px solid ' + theme.palette.dark.card,
			borderLeft: (theme) => '10px solid ' + theme.palette.dark.card}}>
			{props.children}
		</Box>
	)
}

const firstThird = [
	{val: 3, red: true}, {val: 6}, {val: 9, red: true}, {val: 12},
	{val: 2}, {val: 5, red: true}, {val: 8}, {val: 11},
	{val: 1, red: true}, {val: 4}, {val: 7, red: true}, {val: 10}]
const secondThird = [
	{val: 15}, {val: 18, red: true}, {val: 21, red: true}, {val: 24},
	{val: 14, red: true}, {val: 17}, {val: 20}, {val: 23, red: true},
	{val: 13}, {val: 16, red: true}, {val: 19, red: true}, {val: 22}]
const thirdThird = [
	{val: 27, red: true}, {val: 30, red: true}, {val: 33}, {val: 36, red: true},
	{val: 26}, {val: 29}, {val: 32, red: true}, {val: 35},
	{val: 25, red: true}, {val: 28}, {val: 31}, {val: 34, red: true}]

export default function GameRoulette({...props}) {
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
			<Grid container sx={{mt: 5, mx: 10}} columns={14}>
				<Grid md={1}><GridZero/></Grid>
				<Grid md={4} container columns={12}>
					{ firstThird.map((val, ind) => 
						<Grid md={3} key={`first-third-${val.val}`}>
							<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4}/>
						</Grid>	
					)}
				</Grid>
				<Grid md={4} container columns={12}>
					{ secondThird.map((val, ind) => 
						<Grid md={3} key={`second-third-${val.val}`}>
							<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4}/>
						</Grid>	
					)}
				</Grid>
				<Grid md={4} container columns={12}>
					{ thirdThird.map((val, ind) => 
						<Grid md={3} key={`third-third-${val.val}`}>
							<GridInside insideNumber={val.val} red={val?.red} topEdge={ind < 4}/>
						</Grid>	
					)}
				</Grid>
				<Grid md={1} sx={{display: 'flex', alignItems: 'stretch'}}>
					<Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
						<GridDozenBet topCard={true} />
						<GridDozenBet />
						<GridDozenBet bottomCard={true} />
					</Box>
				</Grid>

				<Grid md={1}/>
				<Grid md={4}><GridOutsideBet><Typography variant='h5'>1st 12</Typography></GridOutsideBet></Grid>
				<Grid md={4}><GridOutsideBet><Typography variant='h5'>2nd 12</Typography></GridOutsideBet></Grid>
				<Grid md={4}><GridOutsideBet rightCard={true}><Typography variant='h5'>3rd 12</Typography></GridOutsideBet></Grid>
				<Grid md={1} sx={{borderLeft: (theme) => `10px solid ${theme.palette.dark.card}`}} />

				<Grid md={1}/>
				<Grid md={2}><GridOutsideBet><Typography variant='h5'>1-18</Typography></GridOutsideBet></Grid>
				<Grid md={2}><GridOutsideBet><Typography variant='h5'>Even</Typography></GridOutsideBet></Grid>
				<Grid md={2}>
					<GridOutsideBet>
						<Box sx={{width: '32px', height: '32px', backgroundColor: (theme) => theme.palette.game.red}}/>
					</GridOutsideBet>
				</Grid>
				<Grid md={2}>
					<GridOutsideBet>
						<Box sx={{width: '32px', height: '32px', backgroundColor: (theme) => theme.palette.dark.bg}}/>
					</GridOutsideBet>
				</Grid>
				<Grid md={2}><GridOutsideBet><Typography variant='h5'>Odd</Typography></GridOutsideBet></Grid>
				<Grid md={2}><GridOutsideBet rightCard={true}><Typography variant='h5'>19-36</Typography></GridOutsideBet></Grid>
				<Grid md={1} sx={{borderLeft: (theme) => `10px solid ${theme.palette.dark.card}`}} />
			</Grid>

			<Box sx={{mt: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', mb: 5}}>
				<Box sx={{display: 'flex', flexDirection: 'column', mr: 10, mt: 2}}>
					<Typography variant='h3' color="text.accent">Roulette</Typography>
					<TooltipWide title={<Typography>{rouletteTutorial}</Typography>}>
						<Box sx={{display: 'flex', alignItems: 'center'}} color='text.secondary'>
							<Typography variant='h6'>Tutorial</Typography>
							<InfoIcon sx={{ml: 1}}/>
						</Box>
					</TooltipWide>
					<TooltipWide
						title={<Box sx={{display: 'flex', flexDirection: 'column'}}>{rouletteOdds.map((v) => <Typography>{v}</Typography>)}</Box>}>
						<Box sx={{display: 'flex', alignItems: 'center'}} color='text.secondary'>
							<Typography variant='h6'>Odds</Typography>
							<InfoIcon sx={{ml: 1}}/>
						</Box>
					</TooltipWide>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'column'}}>
					<TextFieldCurrency label='Bet Amount' variant='standard' />
					<Typography color='text.secondary'>Total Balance {currency(10000).format()}</Typography>
					<Typography color='text.secondary'>Remaining Balance {currency(10000).format()}</Typography>
					<Typography color='text.secondary'>Current Bet Total {currency(0).format()}</Typography>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 3, mt: 1}}>
					<Tooltip title={<Typography>Undo last bet</Typography>}>
						<IconButton><UndoIcon/></IconButton>
					</Tooltip>
					<Tooltip title={<Typography>Clear bet</Typography>}>
						<IconButton sx={{mt: 1}}><ClearIcon/></IconButton>
					</Tooltip>
				</Box>
				<Box sx={{ml: 3, mt: 1}}>
					<Button disabled>Submit Bet</Button>
				</Box>
			</Box>
		</Box>
	)
}