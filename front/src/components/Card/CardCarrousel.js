import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'


const useGridStyles = makeStyles(( {breakpoints }) => ({
    root: {
        [breakpoints.up('sm')]: {
            justifyContent: 'center',
        },
    },
}))


const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: '16px',
        transition: '0.2s',
        '&:hover': {
            transform: "scale3d(1.05, 1.05, 1)"
        },
    },
    card: ({ color }) => ({
        minWidth: 240,
        boxShadow: 'none',

    }),
    content: ({ color }) => {
        return {
            background: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        color: '#fff',
        textTransform: "uppercase",
        fontSize: '2rem',
    },
    subtitle: {
        color: '#fff',
        marginTop: '1.5rem',
        fontWeight: 500,
        fontSize: 14
    },
    media: {
        height: 180
    }
}))

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

const CardCarrousel = () => {
    const gridStyles = useGridStyles()
    const styles = useStyles({ color: '#ff5917' });
    const styles2 = useStyles({ color: '#4d137f' });
    const styles3 = useStyles({ color: '#ff9900' });
    const styles4 = useStyles({ color: '#34241e' });

    return (
      <>
      <Container maxWidth={'md'}>
        <Grid classes={gridStyles} container spacing={2}>
            <Grid item xs={12}>
                <CustomCard
                    classes={styles}
                    title={'Alitas BBQ'}
                    subtitle={'sdfjkdskjsdalk'}
                    image={'https://dinnerthendessert.com/wp-content/uploads/2019/11/BBQ-Chicken-Wings-4x3.jpg'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomCard
                    classes={styles2}
                    title={'Chicken burger'}
                    subtitle={'djfksdajfksjalñ'}
                    image={'https://i.imgur.com/wiuFd00.jpeg'}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <CustomCard
                    classes={styles3}
                    title={'Alitas BBQ'}
                    subtitle={'sadkfjkdslsa'}
                    image={'https://www.vhv.rs/dpng/d/414-4140579_fried-chicken-bucket-png-chicken-tenders-in-a.png'}
                />
            </Grid>
            <Grid item xs={6}>
                <CustomCard
                    classes={styles4}
                    title={'Ensaladas'}
                    subtitle={'daskfdsajfsadñl'}
                    image={'https://www.comedera.com/wp-content/uploads/2015/10/ensalada-de-pollo.jpg'}
                />
            </Grid>
            <Grid item xs={6}>
                <CustomCard
                    classes={styles4}
                    title={'Teriyaki'}
                    subtitle={'kdfsjkfjlsa'}
                    image={'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/baked-teriyaki-chicken.jpg'}
                />
            </Grid>
        </Grid>
        </Container>
      </>
    )
}

export default CardCarrousel
