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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ALL_FARMS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useFarmContext } from '../utils/FarmContext';


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
    formControl: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    linkStyle: {
        margin: "1rem",
        textDecoration: "none",
        color: 'blue'
    }
}));


export default function Pricing() {
    const { search, searchFarms } = useFarmContext()
    const classes = useStyles();
    // const [zipcode, setZipcode] = React.useState('');
    const handleChange = (event) => {
        searchFarms(event.target.value);
    };


    const { loading, error, data } = useQuery(ALL_FARMS);
    console.log(data)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const farms = data?.farms || [];
    console.log(farms)


    return (
        <React.Fragment>
            <CssBaseline />
            <Box className={classes.heroBox}>
                <Avatar className={classes.avatar}>
                    <ExploreRoundedIcon />
                </Avatar>

                {/* Hero unit */}
                <Container maxWidth="sm" component="main" className={classes.heroContent} id="splashContainer">

                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Find a farming community now
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" component="p">
                        Search for fresh produce in near you
                    </Typography>


                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Farms at these states</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            id="select-filled"
                            value={search}
                            onChange={handleChange}
                        >
                            {
                                farms.map(farm => <MenuItem value={farm.state}>{farm.state}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <div>
                        <Link to="./farmResults"style={{ textDecoration: 'none' }}>
                            <Button href="./farmresults" variant="contained" color="neutral" className={classes.searchBtn} >
                                Search
                            </Button>
                        </Link>
                        



                        {/* Idk what to do */}
                        {/* <Link color="inherit"
                            to={{
                                pathname: "./farmresults",
                                state: {
                                    farmState: zipcode
                                }
                            }}>
                            <Button href="./farmresults" variant="contained" color="neutral" className={classes.searchBtn} >
                                Search
                            </Button>
                        </Link> */}





                    </div>

                </Container>
                {/* End hero unit */}
            </Box>
        </React.Fragment>
    );
}

