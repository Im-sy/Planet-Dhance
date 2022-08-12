import * as React from 'react';
import {login, logout, oauth2} from '../components/API/AuthService';
import NavBar from '../components/NavBar';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import '../styles/styles.css';


const CssTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white'
  },
  '& label': {
    color: '#FFE5B4',
  },
  '& label.Mui-focused': {
    color: '#E8AA42',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#FFE5B4',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFE5B4',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E8AA42',
    },
  },
});

const theme = createTheme();

export default function SignIn() { 
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const email = data.get('email') as string
    const pwd = data.get('password') as string
    const loginRes = await login(email, pwd)
    // console.log(loginRes)
    if (loginRes.state === "Success"){
      navigate('/')
    }
  };

  const handleLogout = () => {
    const logoutRes = logout(132)
    console.log(logoutRes)
  };

  const handleAuth = () => {
    oauth2()
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              // color="warning"
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // color="warning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  sx={{
                    color: "#FFE5B4",
                    "&.Mui-checked": {
                      color: "#E8AA42",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link sx={{ color: "#E8AA42" }} href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  sx={{ color: "#E8AA42" }}
                  href="/signup"
                  variant="body2"
                  component={RouterLink}
                  to="/signup"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
            onClick={handleLogout}
            fullWidth
            size="large"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Log Out
          </Button>
          <Box>
            <Button
              variant="contained"
              color="inherit"
              sx={{ mt: 8, mx: 3, py: 2, borderRadius: "50%" }}
              onClick={handleAuth}
            >
              <img
                src="http://pngimg.com/uploads/google/google_PNG19635.png"
                alt="google"
                width="30"
              />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ mt: 8, mx: 3, py: 2, borderRadius: "50%" }}
            >
              <img
                src="https://logostransparent.com/wp-content/uploads/2022/03/Meta-Logo-Transparent.png"
                alt="google"
                width="30"
              />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{ mt: 8, mx: 3, py: 2, borderRadius: "50%" }}
            >
              <img
                src="https://seeklogo.com/images/T/twitter-icon-circle-blue-logo-0902F48837-seeklogo.com.png"
                alt="google"
                width="30"
              />
            </Button>
          </Box>
        </Box>
      </Container>
      <NavBar />
    </ThemeProvider>
  );
}