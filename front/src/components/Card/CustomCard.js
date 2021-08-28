import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

/**
 * Define un componente de tipo Card bastante flexible.
 * Para un ejemplo de su implementación revisar CardCarrousel.js
 * @param {} param0 
 * @returns 
 */
const CustomCard = ({ classes, image, title, subtitle }) => {
    return (
        <CardActionArea className={classes.actionArea}>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={image}/>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} variant={'h2'}>
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea> 
    )
}
export default CustomCard