import './header.scss';
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import logo from './assets/logo/droopLeafV1.png';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    cartBtn: {
        flexGrow: 1,
        background: '#FAB617',
        borderRadius: 10,
        border: 0,
        color: 'black',
        height: 38,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
        marginTop: -40,

    },
    darkModeBtn: {
        background: 'black',
        borderRadius: 10,
        border: 0,
        color: 'white',
        height: 38,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
        marginTop: -40,

    },
    portalBtn: {
        margin: theme.spacing(0, 1.5),
        background: '#FAB617',
        borderRadius: 10,
        border: 0,
        color: 'black',
        height: 38,
        padding: '15px 45px',
        boxShadow: '5 0 20px #eee',
        marginTop: -40,

    },
    toolbarTitle: {
        display: 'flex',
        flexGrow: 1,
    },
    logo: {
        display: 'flex',
        marginTop: 20,
        marginBottom: 20,
    },
}));


export default function Header({darkMode, setDarkMode}) {
    const classes = useStyles();
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar className={classes.toolbar}>

                {/* need to figure out why local source not working for images*/}
                <div className={classes.logo}>
                    <Link id="ffLogo" to="/">
                    <img  src="https://raw.githubusercontent.com/luketeal/farmerFresh/main/assets/logo/droopLeafV1.png" />
                    </Link>
                    
                </div>


                <Typography variant="h6" color="inherit" className={classes.toolbarTitle}>
                    {/* <img src={logo} alt="logo" /> */}
                </Typography>

                <nav>
                    <Button href="#" color="neutral" variant="contained" className={classes.cartBtn}>
                        Cart
                    </Button>
                </nav>
                <Link to="./farmerdash" style={{ textDecoration: 'none' }}>
                    <Button color="neutral" variant="contained" className={classes.portalBtn}>
                        Farmer Portal
                    </Button>
                </Link>
                <Button onClick={() => {
                    setDarkMode( !darkMode)
                }}color="neutral" variant="contained" className={classes.darkModeBtn}>
                    Dark Mode
                </Button>
            </Toolbar>
        </AppBar>
    )
}
