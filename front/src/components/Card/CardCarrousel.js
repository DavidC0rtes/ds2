import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CustomCard from './CustomCard'


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
                    title={'Alitas'}
                    subtitle={'Para los amantes de las alitas'}
                    image={'https://dinnerthendessert.com/wp-content/uploads/2019/11/BBQ-Chicken-Wings-4x3.jpg'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomCard
                    classes={styles2}
                    title={'Chicken burger'}
                    subtitle={'150 gramos de puro pollo'}
                    image={'https://i.imgur.com/wiuFd00.jpeg'}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <CustomCard
                    classes={styles3}
                    title={'Chicken Box'}
                    subtitle={'Saborealos uno a la vez'}
                    image={'https://www.vhv.rs/dpng/d/414-4140579_fried-chicken-bucket-png-chicken-tenders-in-a.png'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomCard
                    classes={styles4}
                    title={'Ensaladas'}
                    subtitle={'Frescas, completas y saludables'}
                    image={'https://www.comedera.com/wp-content/uploads/2015/10/ensalada-de-pollo.jpg'}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomCard
                    classes={styles}
                    title={'Teriyaki'}
                    subtitle={'Prueba nuestras recetas con pollo teriyaki'}
                    image={'https://www.splenda.com/wp-content/themes/bistrotheme/assets/recipe-images/baked-teriyaki-chicken.jpg'}
                />
            </Grid>
        </Grid>
        </Container>
      </>
    )
}

export default CardCarrousel
