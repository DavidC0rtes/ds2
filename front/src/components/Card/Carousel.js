import React from 'react';
import Carousel from "react-material-ui-carousel"
//import '../style/Example.scss';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Slider,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    Content: {
        color: '#fff',
        backgroundColor: 'darkred',
        height: '100%',
        position: 'relative',
        padding: '30px'
    },
    Title: {
        fontWeight: 500
    },
    Media: {
        backgroundColor: 'white',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: '300ms',
        '&:hover': {
            filter: 'brightness(115%)'
        }
    },
    Banner: {
        position: 'relative',
        height: '500px'
    },
    Caption: {
        marginTop: '10px',
        fontSize: '1.5em'
    },
    BanneGrid: {
        height: '100%',
        position: 'relative'
    },
    MediaCaption: {
        textOverflow: 'ellipsis',
        
        position: 'absolute',
        bottom: 0,

        padding: '15px',

        backgroundColor: 'black',
        color: 'white',
        opacity: 0.6,

        width: '100%',
        height: '10%',
        fontWeight: 200,
        transition: '300ms'

    },
    ViewButton: {
        marginTop: '40px',
        border: '3px solid white',
        color: 'white',
        transition: '200ms'
    }
})

const CustomCarousel = (props) => {
    //const classes = useStyles()
    
    return(
        <Carousel animation="slide">
            {
                props.items.map((item, i) => {
                    return <Banner item={item} key={i} contentPosition={item.contentPosition}/>
                })
            }
        </Carousel>
    )
}

function Banner(props) {
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.item.Items.length + 1
    const mediaLength = totalItems - 1

    
    const classes = useStyles()

    let items = [];
    const content = (
        <Grid item xs={3} key="content">
            <CardContent className={classes.Content}>
                <Typography className={classes.Title}>
                    {props.item.Name}
                </Typography>

                <Typography className={classes.Caption}>
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className={classes.ViewButton}>
                    Me antojé
                </Button>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs key={item.Name}>
                <CardMedia
                    className={classes.Media}
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className={classes.MediaCaption}>
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className={classes.Banner}>
            <Grid container spacing={0} className={classes.BanneGrid}>
                {items}
            </Grid>
        </Card>
    )
}

export default CustomCarousel;