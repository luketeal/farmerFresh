import './header.scss';
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(25, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'transparent' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
}));


export default function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>

                <Link component="button" variant="primary" href="./#">
                    <img src="https://img.icons8.com/cotton/50/000000/farm-with-silo--v2.png" />
                </Link>

                <Typography variant="h6" color="inherit" className={classes.toolbarTitle}>
                    Farmer Fresh Marketplace Logo
                </Typography>
                <nav>
                    <Button href="#" color="primary" variant="outlined" className={classes.link}>
                        Cart
                    </Button>
                </nav>
                <Button href="./farmerdash" color="primary" variant="outlined" className={classes.link}>
                    Farmer Portal
                </Button>
            </Toolbar>
        </AppBar>
    )
}
