import React from 'react'
import {
	Button,
	Box,
	Typography
} from '@mui/material/';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

const networkChain = (chainId) => {
	if (chainId === 1) {
		return 'Ethereum'
	}
	else if (chainId === 137) {
		return 'Polygon'
	}
	else if (chainId === 43114) {
		return 'Avalanche'
	}
	else {
		return null
	}
}

export default function DynamicAuth ({...props}) {
	const { network, setShowAuthFlow, primaryWallet, handleLogOut } = useDynamicContext();
	let n = networkChain(network)
	return (
		primaryWallet ?
    	<Box sx={{display: 'flex', flexDirection: 'column'}}>
    		<Typography>{primaryWallet?.address} - {n ? n : 'This chain is not supported'}</Typography>
    		<Button onClick={() => handleLogOut()}>Sign Out</Button>
    	</Box>

    :
    	<Box>
    		<Button onClick={() => setShowAuthFlow(true)}>Auth</Button>
    	</Box>

	)
}