import * as React from 'react';
import NavBar from '../components/NavBar';
import {Link as RouterLink} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';

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

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      nation: data.get('nation'),
      nickname: data.get('nickname'),
      password: data.get('password'),
      password2: data.get('password2'),
    });
  };

  const [nation, setNation] = React.useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setNation(event.target.value as string);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={9.5}>
                <CssTextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={2.5}>
                <Button variant="outlined" 
                  sx={{
                    color: '#FFE5B4',
                    borderColor: '#FFE5B4',
                    height: '100%'
                  }}>
                  <CheckIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-label" sx={{color: '#FFE5B4', '&.Mui-focused':{color: '#E8AA42'}}}>Nation</InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={nation}
                    label="Nation"
                    onChange={handleChange}
                    sx={{
                      color: "white",
                      '.MuiSvgIcon-root': {fill:'#FFE5B4'}, 
                      '.MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFE5B4',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E8AA42',
                      },}}
                  >
                    <MenuItem value={'Dhance'}>🪐Dhance</MenuItem>
                    <MenuItem value={'Australia'}>🇦🇺 Australia</MenuItem>
                    <MenuItem value={'Canada'}>🇨🇦 Canada</MenuItem>
                    <MenuItem value={'China'}>🇨🇳 China</MenuItem>
                    <MenuItem value={'Egypt'}>🇪🇬 Egypt</MenuItem>
                    <MenuItem value={'Europe'}>🇪🇺 Europe</MenuItem>
                    <MenuItem value={'Japan'}>🇯🇵 Japan</MenuItem>
                    <MenuItem value={'Korea'}>🇰🇷 Korea</MenuItem>
                    <MenuItem value={'RSA'}>🇿🇦 RSA</MenuItem>
                    <MenuItem value={'USA'}>🇺🇸 USA</MenuItem>
                    <MenuItem value={'Vietnam'}>🇻🇳 Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={9.5}>
                <CssTextField
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nick Name"
                />
              </Grid>
              <Grid item xs={2.5}>
                <Button variant="outlined" 
                  sx={{
                    color: '#FFE5B4',
                    borderColor: '#FFE5B4',
                    height: '100%'
                  }}>
                  <CheckIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" sx={{
                    color: '#FFE5B4',
                    '&.Mui-checked': {
                      color: '#E8AA42',
                    }}} />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link sx={{color: '#E8AA42'}} href="#" variant="body2" component={RouterLink} to='/login'>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      <NavBar />
    </ThemeProvider>
  );
}