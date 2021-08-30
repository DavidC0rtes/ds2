import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AlertDialog(props)  {

	const [open, setOpen] = React.useState(false)
	
	return (
		<>
			<Button onClick={() => setOpen(true)}>
				{props.btnTxt}
			</Button>
			<Dialog
			  open={open}
			  onClose={() => setOpen(false)}
			>
				<DialogTitle>{props.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{props.message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>
						{props.disagreeTxt}
					</Button>
					<Button onClick={props.doAction}>
						{props.agreeTxt}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}