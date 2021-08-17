import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FilterHdrRoundedIcon from '@material-ui/icons/FilterHdrRounded';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFarmContext } from '../utils/FarmContext';
import {FARMS_BY_ID} from '../utils/queries'
import { useQuery } from '@apollo/client';


const useStyles = makeStyles((theme) => ({
    root: {

    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(20, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },


    media: {
        height: 140,
    },

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },

}));

const cards = [1, 2, 3, 4, 5, 6];

export default function FarmVeggieResults() {
    const classes = useStyles();
    const { farmId } = useFarmContext()

    const { loading, error, data } = useQuery(FARMS_BY_ID, {
        variables: { _id: farmId },
    });
    const farm = data?.farm || [{
        _id: "",
        name: "",
        description: "",
        state: "",
        town: "",
        address: "",
        website: "",
        zip: "",
        items: []
    }];

    if(!farm.items) {
        farm.items = []
    }

    console.log(data)
    console.log(farm)

    return (
        <Grid container className={classes.root}>
            <CssBaseline />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square id="farmBox">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FilterHdrRoundedIcon />
                    </Avatar>
                    <Box mt={0} >
                        <Typography component="h1" variant="h2">
                            {farm.name}
                        </Typography>

                        <Typography variant="h4">
                            <ul>
                                <li>
                                    Contact Info: 1-800-Veggie4U
                                </li>
                                <li>
                                    Address: {farm.address}, {farm.town} {farm.state}
                                </li>
                            </ul>
                        </Typography>

                    </Box>

                </div>
            </Grid>
            {/* for the farm image to the right */}
            <Grid item xs={false} sm={4} md={7} className={classes.image} elevation={6} square />


            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {farm.items.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card id="cardContent" className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://images.unsplash.com/photo-1575218823251-f9d243b6f720?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                                    title="Image title"
                                />
                                <CardContent className={classes.card}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {card.name}
                                    </Typography>
                                    <Typography>
                                        <ul>
                                            <li>
                                                {card.price} {card.unit}
                                            </li>
                                            <li>
                                                {card.count} available
                                            </li>
                                        </ul>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="secondary" variant="outlined">
                                        Buy
                                    </Button>
                                    <Button size="small" color="secondary" variant="outlined">
                                        Learn more
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Grid >
    );
}