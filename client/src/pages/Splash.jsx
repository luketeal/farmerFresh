import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import Grid from '@material-ui/core/Grid';
// import StarIcon from '@material-ui/icons/StarBorder';



const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    heroContent: {
        padding: theme.spacing(3, 0, 6),
    },
    heroBox: {
        display: 'flex',
        borderRadius: 10,
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    searchBtn: {
        background: '#F50057',
        borderRadius: 10,
        border: 0,
        color: 'white',
        height: 48,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
        marginTop: theme.spacing(3),
    },
    searchBar: {
        marginTop: theme.spacing(3),
    },
}));


export default function Pricing() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />


            <Box className={classes.heroBox}>
                <Avatar className={classes.avatar}>
                    <ExploreRoundedIcon />
                </Avatar>

                {/* Hero unit */}
                <Container maxWidth="sm" component="main" className={classes.heroContent}>

                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Find a farming community now
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Search for fresh produce in near you
                    </Typography>

                    <div>
                        <TextField id="outlined-basic" label="Enter zip code" variant="outlined" className={classes.searchBar} />
                    </div>
                    <div>
                        <Button href="./farmresults" variant="contained" color="neutral" className={classes.searchBtn} >
                            Search
                        </Button>
                    </div>

                </Container>
                {/* End hero unit */}

            </Box>


        </React.Fragment>
    );
}
