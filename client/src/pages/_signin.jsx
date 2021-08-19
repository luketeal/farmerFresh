import React, {useState} from 'react';           // added use state
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';  // need to figure out text field.
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// -------------------------------------------- added for auth -------------------------------------------------------------
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// -------------------------------------------------------------------------------------------------------------------

// ---------------------------- importing auth -----------------------------------------------------------------------
import Auth from '../utils/auth';
// -------------------------------------------------------------------------------------------------------------------



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#F50057',
    borderRadius: 10,
    border: 0,
    color: 'white',
    height: 48,
    padding: '15px 45px',
    boxShadow: '5 0 20px #eee',
    marginTop: theme.spacing(3),
  },
}));


  // --------------------------------------------------- adding log in function for auth ----------------------------------------------------

// const Login = (props) => {
//   const [formState, setFormState] = useState({ email: '', password: '' });
//   const [login, { error, data }] = useMutation(LOGIN_USER);

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     console.log(formState);
//     try {
//       const { data } = await login({
//         variables: { ...formState },
//       });

//       Auth.login(data.login.token);
//     } catch (e) {
//       console.error(e);
//     }

//     // clear form values
//     setFormState({
//       email: '',
//       password: '',
//     });
//   };

// -------------------------------------------------------------------------------------------------------------------------------

export default function SignIn (props) {
  const classes = useStyles();

// ----------------------------------------------- This code is added for handling the form submit with auth ----------------------------------
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };


// ----------------------------------------------------------------------------------------------------------------------------------


  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* ---------------------------------- Error checking for data or no data ---------------------------------------------------------- */}
        {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
        ) : (
        // --------------------------------------------------------------------------------------------------------

        <form onSubmit={handleFormSubmit} id="SignInForm" className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"    // added code to submit.
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"               // added code to submit.
            placeholder="Password"
            type="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
{/* ----------------------------------------------------------------------------------------------------------------------------------------
 */}
      {error && (
              <div /*className="my-3 p-3 bg-danger text-white"*/>
                {error.message}
              </div>
            )}
    {/* ------------------------------------------------------------------------------------------------------------------------------------ */}
      </div>
    </Container>
  );
}


