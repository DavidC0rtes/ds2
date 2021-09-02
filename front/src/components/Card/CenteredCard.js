import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { CardContent } from '@material-ui/core'

const useStyles = makeStyles({
	root: {
		justifyContent: 'center',
		minWidth: '30%',
		marginTop: '10%'
	}
})


const CenteredCard = (props) => {
	const {variant, header, title,  children} = props
	const classes = useStyles()

	return (
		<Container maxWidth="sm" className={classes.root}>
			<Card variant={variant}>
				<CardContent>
					<Typography color="textSecondary">
						{header}
					</Typography>
					<Typography variant="h5" component="h2">
						{title}
					</Typography>

					<Typography variant="body2" component="p">
						{children}
					</Typography>
				</CardContent>

			</Card>
		</Container>
	)
}
export default CenteredCard