import React, {useState} from 'react';                    // added use state 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// ------------------------------------------------------ADD FOR AUTH-----------------------------------------------------
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';

import Auth from '../utils/auth';


// -----------------------------------------------------------------------------------------------------------------------


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
    marginTop: theme.spacing(3),
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

export default function SignUp() {
  const classes = useStyles();

  // --------------------------------------------------------- added for auth ------------------------------------------------------------------
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(CREATE_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
{/* ------------------------------------------------------------------------------------------------------------------------------ */}
        {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
// ---------------------------------------------------------------------------------------------------------------------------------

        <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                placeholder="First Name"
                type= "text"
                value={formState.firstname}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              variant="outlined"
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
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in Here
              </Link>
            </Grid>
          </Grid>
        </form>
        // ------------------------------------------------------------------------------------------
         )}

         {error && (
           <div className="my-3 p-3 bg-danger text-white">
             {error.message}
           </div>
         )}
    {/* ----------------------------------------------------------------------------------- */}
      </div>
    </Container>
  );
}