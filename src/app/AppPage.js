import React, {useState} from 'react'
import {
	Alert,
	Snackbar,
} from '@mui/material/';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import AppPageBody from './AppPageBody'
import AppPageHeader from './AppPageHeader'

export default function AppPage({...props}) {
	// for the alert snackbar that pops up going through authentication
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const AuthAlert = React.forwardRef(function AuthAlert(props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} sx={{color: (theme) => theme.palette.text.primary}} />;
  });

	return (
		<DynamicContextProvider 
      settings={{
        theme: 'dark',
        environmentId: process.env.REACT_APP_DYNAMIC_ENV_ID,
        multiWallet: true,
        walletConnectors: [EthereumWalletConnectors],
        siweStatement: "Hi there and welcome to betblock! Signing is free (no gas fees), and is required to verify that you are the owner of the connected wallet.",
        eventsCallbacks: {
            onLinkSuccess: (args) => {
                setAlertOpen(true)
                setAlertMessage('Successfully linked wallet')
            },
            onAuthSuccess: (args) => {
                setAlertOpen(true)
                setAlertMessage('Successfully signed in! Welcome')
            },
            onLogout: (args) => {
                setAlertOpen(true)
                setAlertMessage('Successfully logged out. See you again soon')
            },
            onUnlinkSuccess: (args) => {
                setAlertOpen(true)
                setAlertMessage('Successfully unlinked wallet')
            }
        }}}>
            <AppPageHeader />
            <AppPageBody />
			<Snackbar
          open={alertOpen}
          autoHideDuration={1500}
          onClose={() => setAlertOpen(false)}>
          <AuthAlert onClose={() => setAlertOpen(false)} severity='success' sx={{ width: '100%' }}>
              {alertMessage}
          </AuthAlert>
        </Snackbar>
		</DynamicContextProvider>
	)
}