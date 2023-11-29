import React from 'react'
import {
	Box
} from '@mui/material/'
import {
	Routes,
	Route,
	Navigate,
	useLocation
} from 'react-router-dom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import AppLandingPage from './landing/AppLandingPage';
import GameSelection from './games/GameSelection';
import GameRoulette from './games/GameRoulette';

export default function AppPageBody ({
	...props
}) {

	let location = useLocation();

  const { user } = useDynamicContext();

    // wrapper for authentication, or protected pages
  const AuthWrapper = ({children}) => {
    if (!user) {
      return (
          <Navigate to="/" state={{from: location}} replace={true}/>
      )
    }
    return children
  }

	return (
		<Box sx={{mt: '80px'}}>
			<Routes>
				<Route path={'/'} element={<AppLandingPage />}/>
				<Route path={'lending'} element={<AuthWrapper><Box>Lending Page</Box></AuthWrapper>}/>
				<Route path={'games'} element={<AuthWrapper><GameSelection/></AuthWrapper>}/>
				<Route path={'/games/roulette/'} element={<AuthWrapper><GameRoulette/></AuthWrapper>}/>

				<Route path={'community'} element={<AuthWrapper><Box>Community Page</Box></AuthWrapper>}/>
				<Route path={'profile'} element={<AuthWrapper><Box>Profile Page</Box></AuthWrapper>}/>
			</Routes>
		</Box>
	)
}