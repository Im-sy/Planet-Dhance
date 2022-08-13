import React from 'react'
import Paper from '@mui/material/Paper';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MuiBottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import navFav from '../styles/navbtns/navFav.png'
import navHome2 from '../styles/navbtns/navHome2.png'
import navSearch from '../styles/navbtns/navSearch.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from "@mui/material/styles";
import '../styles/NavBar.css'


export default function NavBar() {
  const {isAuthenticated, user} = useSelector(
    (state: rootState) => state.authReducer
  );

  const StyledLink = styled(Link)`
  filter: grayscale(1);
  &:hover, {
    filter: grayscale(0);

    color: #060318ff;
}
  
`;


  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Paper sx={{position: "fixed", bottom: 0, width: "100%" }} elevation={3}>
        <BottomNavigation
          style={{backgroundColor: '#231955'}}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
        >
          <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to="/"
            label="Home"
            icon={<img src={navHome2} alt="navHome" width="50"></img>}
          />
          <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to='/searchsong'
            label="Search"
            icon={<img src={navSearch} alt="navSearch" width="30"></img>}
          />
          <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to='/subscribe'
            label="Favorites"
            icon={<img src={navFav} alt="navFav" width="30"></img>}
          />
          <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to={isAuthenticated ? '/login' : '/mypage'}
            label="My"
            icon={<AccountCircleIcon color="secondary" sx={{ fontSize: 30 }} />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
