import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../reducer';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MuiBottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import navFav from '../styles/navbtns/navFav.png';
import navHome2 from '../styles/navbtns/navHome2.png';
import navSearch from '../styles/navbtns/navSearch.png';
import navExplore from '../styles/navbtns/navExplore.png';
import alien from '../styles/navbtns/alien.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import '../styles/NavBar.css';

interface navProps {
  current: string;
}

export default function NavBar(props: navProps) {
  const { isAuthenticated, user } = useSelector(
    (state: rootState) => state.authReducer
  );
  const { current } = props;
  let navNumber = 4;
  if (current === 'main') {
    navNumber = 0;
  } else if (current === 'search') {
    navNumber = 1;
  } else if (current === 'subscribe') {
    navNumber = 3;
  } else if (current === 'random') {
    navNumber = 2;
  }
  const [value, setValue] = useState(navNumber);

  return (
    <div>
      <Paper sx={{ position: 'fixed', bottom: 0, width: '100%' }} elevation={3}>
        <BottomNavigation
          style={{ backgroundColor: '#231955' }}
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
            to="/hashresult"
            label="Search"
            icon={<img src={navSearch} alt="navSearch" width="30"></img>}
          />
          <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to="/random"
            label="Explore"
            icon={<img src={navExplore} alt="navExplore" width="40"></img>}
          />
          {isAuthenticated ? (
            <MuiBottomNavigationAction
            className="navbar"
            component={Link}
            to="/subscribe"
            label="Favorites"
            icon={<img src={navFav} alt="navFav" width="30"></img>}
          />
          ) : (
            <MuiBottomNavigationAction
              className="navbar"
              component={Link}
              to={'/login'}
              label="Favorites"
              icon={
                <img src={navFav} alt="navFav" width="30"></img>
              }
            />
          )}
          {isAuthenticated ? (
            <MuiBottomNavigationAction
              className="navbar"
              component={Link}
              to={'/mypage'}
              label="My"
              icon={
                <img src={alien} alt="navFav" width="30"></img>
              }
            />
          ) : (
            <MuiBottomNavigationAction
              className="navbar"
              component={Link}
              to={'/login'}
              label="My"
              icon={
                <img src={alien} alt="navFav" width="30"></img>
              }
            />
          )}
        </BottomNavigation>
      </Paper>
    </div>
  );
}
