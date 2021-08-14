// import './portfolio.scss'
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';



const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },

    footer: {
        borderTop: `3px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(10),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

// function for footer copyright
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Farmer Fresh Marketplace
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const classes = useStyles();
    return (
        <div>
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                <Copyright />
            </Container>
            {/* End footer */}
        </div>
    )
}
