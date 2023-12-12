import React, {useState, useEffect, useRef} from 'react';
import {
	Box,
	Typography,
	Paper,
	Tooltip,
	CircularProgress,
	IconButton,
	Divider
} from '@mui/material';
import {styled} from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import currency from 'currency.js'
import PolygonLogo from '../../images/PolygonLogo'
import AvalancheLogo from '../../images/AvalancheLogo'
import ChainlinkLogo from '../../images/ChainlinkLogo'
import Button from '../../common/Button'
import InputModal from '../../common/InputModal'
import TextFieldCurrency from '../../common/TextFieldCurrency'
import {useDynamicContext} from '@dynamic-labs/sdk-react-core';
import {publicFujiClient, walletFujiClient, publicMumbaiClient, walletMumbaiClient} from '../ViemClient'
// import {fujiCollateralAddress, fujiCollateralABI} from './contractDetails'
import {mumbaiLendingAddress, mumbaiLendingABI, fujiLendingABI, fujiLendingAddress} from './contractDetails'
import { getContract, parseEther } from 'viem'

const BackgroundBox = styled(Box)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	background: `radial-gradient(ellipse at 50% 50%, ${theme.palette.bg.primary} 20%, transparent 70%)`
}))

const dataBorrow = [
	//{'asset': 'LINK', 'assetLogo': <ChainlinkLogo simple={+true} />, 'balance': 0, 'apy': 0.03},
	{'asset': 'MATIC (Mumbai Testnet)', 'assetLogo': <PolygonLogo simple={+true} />, 'apy': 0.94},
	{'asset': 'AVAX (Fuji Testnet)', 'assetLogo': <AvalancheLogo simple={+true} sx={{width: '22px'}} />, 'apy': 2.05},
]

export default function BankHome({...props}) {
	const [openBorrowModal, setOpenBorrowModal] = useState(false)
	const [modalTitle, setModalTitle] = useState(null)
	const [modalType, setModalType] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const [inputSubLabel, setInputSubLabel] = useState(null)
	const [inputErrorMessage, setInputErrorMessage] = useState('')

	// balance
	const [linkBalance, setLinkBalance] = useState(-1)
	const [avaxBalance, setAvaxBalance] = useState(-1)
	const [maticBalance, setMaticBalance] = useState(-1)

	// price
	const [linkPrice, setLinkPrice] = useState(-1)
	const [avaxPrice, setAvaxPrice] = useState(-1)
	const [maticPrice, setMaticPrice] = useState(-1)

	const [maticBorrowable, setMaticBorrowable] = useState(0.)
	const [maticCurrent, setMaticCurrent] = useState(0.)
	const [maticBorrowDisable, setMaticBorrowDisable] = useState(false);
	const [maticRepayDisable, setMaticRepayDisable] = useState(false);
	const [maticInput, setMaticInput] = useState('')

	const mounted = useRef(true)

	const {primaryWallet} = useDynamicContext();

	const handleInputChange = (e) => {
		let val = e.target.value;
		setInputValue(val)
		setInputErrorMessage('')
	}

	const openModal = async (asset, assetLogo) => {
		if (asset === 'MATIC (Mumbai Testnet)') {
			setOpenBorrowModal(true)
			setModalType('matic')
			setInputSubLabel(
				<React.Fragment>
					<Typography color='text.secondary' sx={{fontSize: '0.875rem'}}>{'Balance: ' + maticBalance}</Typography>
				</React.Fragment>)
			setModalTitle(
				<React.Fragment>
					<PolygonLogo simple={+true} sx={{width: '30px', height: '30px'}} />
					<Typography variant='h6' sx={{ml: 1}}>MATIC (Mumbai Testnet) Collateral</Typography>
				</React.Fragment>
			)
		}
		// update the avalanche modal
		else if (asset === 'AVAX (Fuji Testnet)') {
			await publicFujiClient.estimateGas({account: primaryWallet?.address}).then((res) => {
					if (mounted.current) {
						setInputSubLabel(
							<React.Fragment>
								<Typography color='text.secondary' sx={{fontSize: '0.875rem'}}>{'Balance: ' + avaxBalance}</Typography>
							</React.Fragment>
						)
					}
				}).catch((err) => {
					if (mounted.current) {
						setAvaxBalance(0.)
					}
				}).finally(() => {
					if (mounted.current) {
						setOpenBorrowModal(true)
						setModalType('avax')
						setModalTitle(
							<React.Fragment>
								<AvalancheLogo simple={+true} sx={{width: '30px'}} />
								<Typography variant='h6' sx={{ml: 1}}>AVAX (Fuji Testnet) Collateral</Typography>
							</React.Fragment>
						)
					}
				})
		}
	}

	// submit matic for collateral
	const handleSubmitMatic = async () => {
		let amount = parseFloat(inputValue)
		// cannot exceed balance
		if (amount > maticBalance) {
			setInputErrorMessage('Exceeding balance!')
			return
		}
		if (amount < 0) {
			setInputErrorMessage('Input must be non-negative')
			return
		}
		// matic lending
		let sendSim = await publicFujiClient.simulateContract({
			address: mumbaiLendingAddress,
			abi: mumbaiLendingABI,
			functionName: 'depositCollateral',
			value: parseEther('' + inputValue),
			account: primaryWallet?.address
		})
		await walletMumbaiClient.writeContract(sendSim.request)
	}

	// submit matic for collateral
	const handleSubmitAvax = () => {
		let amount = parseFloat(inputValue)
		// cannot exceed balance
		if (amount > avaxBalance) {
			setInputErrorMessage('Exceeding balance!')
			return
		}
		if (amount < 0) {
			setInputErrorMessage('Input must be non-negative')
			return
		}
	}

	const closeModal = () => {
		setOpenBorrowModal(false)
		setInputValue('')
		setInputErrorMessage('')
	}

	// button to borrow matic
	const borrowMatic = async () => {
		setMaticBorrowDisable(true)
		try {
			let borrow = await publicMumbaiClient.simulateContract({
				address: mumbaiLendingAddress,
				abi: mumbaiLendingABI,
				functionName: 'borrowTokens',
				args: [parseEther(maticInput)]
			})
			await walletMumbaiClient.writeContract(borrow.request)
		} catch (err) {
			console.log(err.message)
		}
		setMaticBorrowDisable(false)
	}

	const repayMatic = async () => {
		setMaticRepayDisable(true)
		try {
			let borrow = await publicMumbaiClient.simulateContract({
				address: mumbaiLendingAddress,
				abi: mumbaiLendingABI,
				functionName: 'repayLoan',
				args: [parseEther(maticInput)]
			})
			await walletMumbaiClient.writeContract(borrow.request)	
		}
		catch (err) {
			console.log(err.message)
		}
		setMaticRepayDisable(false)
	}

	// load the borrow modal with numbers
	const borrowableDataLoad = async () => {
		if (primaryWallet?.address) {
			let mumbaiBorrowableVal = await publicMumbaiClient.readContract({
				address: mumbaiLendingAddress,
				abi: mumbaiLendingABI,
				functionName: 'getMaxBorrowable',
				args: [primaryWallet?.address]
			})
			setMaticBorrowable(parseInt(mumbaiBorrowableVal) * 1E-18)

			let mumbaiBorrowBalance = await publicMumbaiClient.readContract({
				address: mumbaiLendingAddress,
				abi: mumbaiLendingABI,
				functionName: 'getBorrowerBalance',
				args: [primaryWallet?.address]
			})
			setMaticCurrent(parseInt(mumbaiBorrowBalance) * 1E-18)
		}
	}

	// get the balances
	useEffect(() => {
		mounted.current = true
		const dataPull = async () => {
			if (primaryWallet?.address) {
				publicFujiClient.getBalance({address: primaryWallet?.address}).then((res) => {
					if (mounted.current) {
						setAvaxBalance(parseInt(res) * 1E-18)
					}
				}).catch((err) => {
					if (mounted.current) {
						setAvaxBalance(0.)
					}
				})
				publicMumbaiClient.getBalance({address: primaryWallet?.address}).then((res) => {
					if (mounted.current) {
						setMaticBalance(parseInt(res) * 1E-18)
					}
				}).catch((err) => {
					if (mounted.current) {
						setMaticBalance(0.)
					}
				})

				// link price load
				publicMumbaiClient.readContract({
					address: mumbaiLendingAddress,
					abi: mumbaiLendingABI,
					functionName: 'getLatestLinkPrice'
				}).then((res) => {
					if (res) {
						setLinkPrice(parseInt(res) * 1E-8)
					}
				})

				// matic price load
				publicMumbaiClient.readContract({
					address: mumbaiLendingAddress,
					abi: mumbaiLendingABI,
					functionName: 'getLatestMaticPrice'
				}).then((res) => {
					if (res) {
						setMaticPrice(parseInt(res) * 1E-8)
					}
				})

				// fuji price load
				publicFujiClient.readContract({
					address: fujiLendingAddress,
					abi: fujiLendingABI,
					functionName: 'getLatestAvaxPrice'
				}).then((res) => {
					setAvaxPrice(parseInt(res) * 1E-8)
				})
			}
		}

		dataPull()
		borrowableDataLoad()

		return () => {
			mounted.current = false
		}
	}, [primaryWallet?.address, openBorrowModal])

	const getBalanceCell = (asset, val) => {
		if (asset === 'MATIC (Mumbai Testnet)') {
			return maticBalance < 0 ? <CircularProgress size="1.6rem" /> :
				<Typography>{currency(maticBalance, {'pattern': '#', precision: 3}).format()}</Typography>
		}
		else if (asset === 'AVAX (Fuji Testnet)') {
			return avaxBalance < 0 ? <CircularProgress size="1.6rem" /> :
				<Typography>{currency(avaxBalance, {'pattern': '#', precision: 3}).format()}</Typography>
		}
	}

	const getPriceCell = (asset, val) => {
		if (asset === 'MATIC (Mumbai Testnet)') {
			return maticPrice < 0 ? <CircularProgress size="1.6rem" /> :
				<Typography>{currency(maticPrice).format()}</Typography>
		}
		else if (asset === 'AVAX (Fuji Testnet)') {
			return avaxPrice < 0 ? <CircularProgress size="1.6rem" /> :
				<Typography>{currency(avaxPrice).format()}</Typography>
		}
	}

	const columns = [
		{field: 'asset', flex: 2, renderCell: (params) => (
			<Box sx={{display: 'flex', alignItems: 'center'}}>
				{params.row.assetLogo}
				<Typography sx={{ml: 1}}>{params.value}</Typography>
			</Box>
		), renderHeader: (params) => (
			<Box sx={{display: 'flex', flex: 1}}>
				<Typography sx={{fontSize: '0.875rem', fontWeight: 500}}>Asset</Typography>
			</Box>
		)},
		{field: 'price', 'headerName': 'Price', minWidth: 110, renderCell: (params) => (
			<Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end', mr: '20px'}}>
				{ getPriceCell(params.row.asset) }
			</Box>
		)},
		{field: 'balance', 'headerName': 'Wallet Balance', minWidth: 150, renderCell: (params) => (
			<Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end', mr: '20px'}}>
				{ getBalanceCell(params.row.asset) }
			</Box>
		), renderHeader: (params) => (
			<Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
				<Typography sx={{fontSize: '0.875rem', fontWeight: 500}}>Wallet Balance</Typography>
			</Box>
		)},
		{field: 'apy', 'headerName': 'APY', minWidth: 90, renderCell: (params) => (
			<Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end', mr: '20px'}}>
				<Typography>{params.value}%</Typography>
			</Box>
		)},
		{field: 'Action', sortable: false, hideable: false, disableColumnMenu: true, headerName: '',
			width: 80, renderCell: (params) => (
					<Button onClick={() => openModal(params.row.asset)}>Deposit</Button>
		)},
		{field: 'Action2', sortable: false, hideable: false, disableColumnMenu: true, headerName: '',
			width: 90, renderCell: (params) => (
					<Button onClick={() => openModal(params.row.asset)}>Withdraw</Button>
		)},
	]

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (primaryWallet?.address) {
// 			let addr = primaryWallet.address
// 
// 			const amount = parseEther('0.0001')
// 
// 			var {request} = await publicFujiClient.simulateContract({
// 				address: fujiCollateralAddress,
// 				abi: fujiCollateralABI,
// 				functionName: 'sendMessage',
// 				args: [14767482510784806043, '0x865B3358db605d839E64EeE2eb501986eE777D6b', '0xd21341536c5cf5eb1bcb58f6723ce26e8d8e90e4', amount],
// 				account: addr
// 			})
// 			// await walletMumbaiClient.writeContract(request)
// 		}
// 		return
// 	}

	return (
		<BackgroundBox>
			<Box id='heading' sx={{mx: '20%', mt: 5, display: 'flex'}}>
				<Box sx={{flex: 1}}>
					<Typography color='text.accent' variant='h3'>The Bank</Typography>
					<Typography color='text.secondary'>Put up your assets as collateral to play</Typography>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						<Typography variant='h4' sx={{mr: 2}}>Total</Typography>
						<ChainlinkLogo simple={+true} sx={{height: '100%', mr: 1}} />
						<Typography variant='h4'>203,746</Typography>
					</Box>
					<Box sx={{display: 'flex', alignItems: 'center'}}>
						{linkPrice < 0 ? <CircularProgress size='1.6rem'/> : <Typography color='text.secondary'>1 LINK = {currency(linkPrice).format()}</Typography>}
						<Typography color='text.secondary' sx={{mr: 1, ml: 3}}>APY {0.03}%</Typography>
						<Tooltip title={<Typography>Add to the LINK pool and earn interest!</Typography>}>
							<Box><Button sx={{mt: 0.5}}>Lend</Button></Box>
						</Tooltip>
					</Box>
				</Box>
			</Box>
			<Box sx={{mx: '20%', my: 5}}>
				<Box sx={{display: 'flex'}}>
					<Paper sx={{flex: 1, p: 2}} elevation={1}>
						<Typography variant='h6'>Borrow LINK</Typography>
						<Box sx={{mt: 3, display: 'flex',}}>
							<Box sx={{flex: 1, display: 'flex', justifyContent: 'center',}}>
								<Box sx={{display: 'flex', flexDirection: 'column'}}>
									<Box sx={{display: 'flex', alignItems: 'center'}}>
										<Box sx={{display: 'flex', alignItems: 'center'}}>
											<PolygonLogo simple={+true} sx={{height: '24px'}}/>
											<Typography variant='h3' sx={{ml: 0.5}}>{maticCurrent}</Typography>
										</Box>
										<Box sx={{ml: 1}}>
											<Typography>Current</Typography>
											<Typography color='text.secondary'>(Mumbai Testnet)</Typography>
										</Box>
									</Box>
									<Box sx={{display: 'flex', alignItems: 'flex-start'}}>
										<TextFieldCurrency sx={{'& .MuiInputBase-input': {padding: '8px'}}}
											handleChange={(e) => setMaticInput(e.target.value)}
											helperText={`Max borrowable: ${maticBorrowable * maticPrice}`}/>
									</Box>
								</Box>
								<Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
									<Button sx={{ml: 4}} disabled={(maticCurrent === 0) || (maticInput === '' || maticRepayDisable)}>Repay</Button>
									<Button sx={{ml: 1, mt: 0.5}} onClick={borrowMatic} disabled={maticInput === '' || maticBorrowDisable}>
										Borrow
									</Button>
								</Box>
							</Box>
							<Divider orientation='vertical' flexItem />
							<Box sx={{flex: 1, display: 'flex', justifyContent: 'center',}}>
								<Box sx={{display: 'flex', flexDirection: 'column'}}>
									<Box sx={{display: 'flex', alignItems: 'center'}}>
										<Box sx={{display: 'flex', alignItems: 'center'}}>
											<AvalancheLogo simple={+true} sx={{height: '24px'}}/>
											<Typography variant='h3' sx={{ml: 0.5}}>0</Typography>
										</Box>
										<Box sx={{ml: 1}}>
											<Typography>Current</Typography>
											<Typography color='text.secondary'>(Fuji Testnet)</Typography>
										</Box>
									</Box>
									<Box sx={{display: 'flex', alignItems: 'flex-start'}}>
										<TextFieldCurrency sx={{'& .MuiInputBase-input': {padding: '8px'}}}
											helperText={`Max borrowable: ${0}`}/>
									</Box>
								</Box>
								<Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
									<Button sx={{ml: 4}} disabled>Repay</Button>
									<Button sx={{ml: 1, mt: 0.5}} disabled>
										Borrow
									</Button>
								</Box>
							</Box>
						</Box>
					</Paper>
				</Box>
				<Box sx={{display: 'flex', mt: 2}}>
					<Paper sx={{flex: 1, p: 2}} elevation={1}>
						<Typography variant='h6'>Deposit Collateral</Typography>
						<Box sx={{mt: 3}}>
							<DataGrid rows={dataBorrow} columns={columns} getRowId={(r) => r.asset} hideFooter />
						</Box>
					</Paper>
				</Box>
			</Box>
			{/* <TextField value={inputValue} onChange={handleInputChange}/> */}
			{/* <Button onClick={handleSubmit}>Submit</Button> */}
			<InputModal
				value={inputValue}
				handleChange={handleInputChange}
				errorMessage={inputErrorMessage}
				handleSubmit={modalType === 'matic' ? handleSubmitMatic : handleSubmitAvax}
				open={openBorrowModal}
				handleClose={closeModal}
				title={modalTitle}
				inputSubLabel={inputSubLabel} />

		</BackgroundBox>
	)
}