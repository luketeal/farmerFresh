import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { useFarmContext } from '../utils/FarmContext';
import {FARMS_BY_STATE} from '../utils/queries'
import { useQuery } from '@apollo/client';


const useStyles = makeStyles((theme) => ({

    mainContent: {
        overflow: 'auto',
    },
    heroContent: {
        marginTop: 10,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    searchBtn: {
        background: '#F50057',
        borderRadius: 10,
        border: 0,
        color: 'white',
        height: 48,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
    const { search, searchFarm, farmId } = useFarmContext()
    console.log(search)
    const classes = useStyles();
    const { loading, error, data } = useQuery(FARMS_BY_STATE, {
        variables: { state: search },
    });

    console.log(data)

    const farms = data?.farmsByState || [];
    console.log(farms)

    const handleClick = (buttonID) => {
        console.log(buttonID)
        searchFarm(buttonID);
        console.log("handleClick ran")
    };


    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.mainContent}>
                <Container maxWidth="sm" className={classes.heroContent} id="resultsContainer">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Farms near You
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        These are the growers based in your area
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="neutral" className={classes.searchBtn}>
                                        Back to search
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>

                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {farms.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card id="cardContent" className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://images.unsplash.com/photo-1613061521413-d01a2539a364?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography>
                                            <ul>
                                                <li>
                                                    {card.description}
                                                </li>
                                                <li>
                                                    Some inspiring thing maybe
                                                </li>
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to="./FarmVeggieResults" style={{ textDecoration: 'none' }} >
                                            <Button size="small" color="secondary" variant="outlined" value={card._id} onClick={() => handleClick(card._id)}>
                                                View
                                            </Button>
                                        </Link>
                                        
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}