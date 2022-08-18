import * as React from 'react';
import {signup, checkEmail, checkNick} from '../components/API/AuthService';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

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

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      nation: nation,
      nickname: data.get('nickname'),
      password: data.get('password'),
      password2: data.get('password2'),
    });
    const email = data.get('email') as string
    const nick = data.get('nickname') as string
    const pwd = data.get('password') as string
    // let formData = new FormData();
    let signupreq = {
      email: email,
      nickname: nick,
      introduce: '',
      nationName: nation,
      pwd: pwd,
      oAuth2Sub: auth,
      type: type,
    }
    
    // formData.append('createSignUpRequest', new Blob([JSON.stringify(signupreq)], {type: 'application/json'}))
    const signupRes = await signup(email, nick, '', nation, pwd, auth, type)
    console.log(signupRes);
    
    if (signupRes) {
      navigate('/login')
    }
  };
  const [email, setEmail] = React.useState('');
  const [nick, setNick] = React.useState('');
  const [avEmail, setAvEmail] = React.useState(true)
  const [avNick, setAvNick] = React.useState(true)
  const [nation, setNation] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [isConfirm, setIsConfirm] = React.useState(true);
  const [auth, setAuth] = React.useState('');
  const [type, setType] = React.useState('Basic')

  const handleChangeNation = (event: SelectChangeEvent<unknown>) => {
    setNation(event.target.value as string);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    console.log(email)
  }

  const handleEmail = async () => {
    console.log(email)
    const dupemail = await checkEmail(email)
    console.log(dupemail)
    if (dupemail === true) {
      setAvEmail(true)
    } else {
      setAvEmail(false)
    }
  }

  const handleChangeNick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNick(event.target.value)
  }

  const handleNick = async () => {
    const dupnick = await checkNick(nick)
    console.log(dupnick)
    if (dupnick === true) {
      setAvNick(true)
    } else {
      setAvNick(false)
    }
  }

  const handleChangePwd = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPwd = event.target.value
    setPwd(currentPwd)
  },[])

  const handleChangeConfirmPwd = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    if (pwd === event.target.value) {
      setIsConfirm(false)
    } else {
      setIsConfirm(true)
    }
  }
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
              <Grid item xs={9.5}><CssTextField
                error = {!avEmail}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                autoFocus
                onChange={handleChangeEmail}
                helperText={avEmail? "":"Email Already Exist"}
                />
              </Grid>
              <Grid item xs={2.5}>
                <Button
                  variant="outlined" 
                  sx={{
                    color: '#FFE5B4',
                    borderColor: '#FFE5B4',
                    height: '56px'
                  }}
                  onClick={handleEmail}>
                  {avEmail ? <CheckIcon /> :  <DoNotDisturbIcon />}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-label" sx={{color: '#FFE5B4', '&.Mui-focused':{color: '#E8AA42'}}}>Nation</InputLabel>
                  <Select
                    required
                    labelId="select-label"
                    id="select"
                    value={nation}
                    label="Nation"
                    onChange={handleChangeNation}
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
                    <MenuItem value={'Dhance'}>🪐 Dhance</MenuItem>
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
                {avNick
                  ? <CssTextField
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nick Name"
                  onChange={handleChangeNick}
                  />
                  : <CssTextField
                  error={!avNick}
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nick Name"
                  onChange={handleChangeNick}
                  helperText={avNick? "":"NickName Already Exist"}
                />
                }
                
              </Grid>
              <Grid item xs={2.5}>
                <Button variant="outlined" 
                  sx={{
                    color: '#FFE5B4',
                    borderColor: '#FFE5B4',
                    height: '56px'
                  }}
                  onClick={handleNick}>
                  {avNick ? <CheckIcon /> : <DoNotDisturbIcon />}
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
                  onChange={handleChangePwd}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  error={isConfirm}
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  onChange={handleChangeConfirmPwd}
                  helperText={isConfirm? "Password Doesn't Match": '' }
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
              disabled={!(avEmail&&avNick&&!isConfirm&&nation)}
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
    </ThemeProvider>
  );
}