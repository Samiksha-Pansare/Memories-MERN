import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
// import { GoogleLogin } from '@react-oauth/google';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { useEffect } from 'react';
import PasswordField from 'material-ui-password-field';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory()
  const [isSignup,setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);
  const [showPassword,setShowPassword] = useState(false);
  const clientId="999907441735-8942jld4ncvbu08utvetkbc8kjh4nd19.apps.googleusercontent.com";


  // const onSuccess = (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     console.log(res);
  //     // console.log("Result: ",result)
  //     // console.log("Token: ",token)
  //     dispatch({ type: 'AUTH', data: { result, token } });
  //     navigate('/')
  //     // history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const onFailure = (err) => {
  //   console.log('failed', err);
  // };

  // const logOut = () => {
  //   setProfile(null);
  // };

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }

  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleShowPassword = () => {
    console.log("Here!")
    setShowPassword(!showPassword)};
    console.log(showPassword,"=Show")
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      console.log(res);
      console.log("Result: ",result)
      console.log("Token: ",token)
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    alert('Google Sign In was unsuccessful. Try again later')
  };

  

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5">{ isSignup? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {/* <PasswordField
                name="password" 
                label="Password" handleChange={handleChange}
                hintText="At least 8 characters"
                floatingLabelText="Enter your password"
                errorText="Your password is too short"
                variant = "outlined"
                required
                fullWidth
                onChange={handleChange}
              /> */}
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="center">
            <Grid item>
              {/* <GoogleLogin
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              /> */}
                  <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={googleSuccess}
              onFailure={googleError}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
          />
              </Grid>
              </Grid>
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>

        </form>
      </Paper>
    </Container>
  )
}

export default Auth
