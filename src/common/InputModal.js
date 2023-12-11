import React from 'react';
import {
	Box,
	Typography,
	Modal,
	IconButton,
	Tooltip
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TextFieldCurrency from './TextFieldCurrency'

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 450,
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 5,
  pl: 4,
  pr: 2,
  py: 2
};

export default function InputModal({
	value,
	handleChange,
	open,
	handleClose,
	errorMessage,
	title,
	inputSubLabel,
	inputPlaceholder = '',
	handleSubmit,
	...props
}) {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-input'>
			<Box sx={style}>
				<Box sx={{display: 'flex', alignItems: 'center'}}>
					<Box sx={{display: 'flex', flex: 1, alignItems: 'center'}}>
						{title ? title : <Typography variant='h6'>Input</Typography>}
					</Box>
					<Tooltip title={<Typography>Close</Typography>}>
						<IconButton onClick={handleClose}><CloseIcon/></IconButton>
					</Tooltip>
				</Box>
				<Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
					<TextFieldCurrency
						error={errorMessage !== ''}
						helperText={errorMessage}
						value={value}
						handleChange={(e) => handleChange(e)}
						fullWidth
						dollarPrefix={false} />
					<Tooltip title={<Typography>Submit amount to use as collateral</Typography>}>
						<Box>
							<IconButton disabled={value === ''} onClick={handleSubmit} sx={{ml: 1}}><NavigateNextIcon/></IconButton>
						</Box>
					</Tooltip>
				</Box>
				{inputSubLabel &&
					<Box sx={{display: 'flex', flexDirection: 'column', mt: 1}}>
						{inputSubLabel}
					</Box>
				}
			</Box>
		</Modal>
	)
}