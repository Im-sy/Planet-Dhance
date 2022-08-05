import React from 'react'
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import navFav from '../styles/navbtns/navFav.png'
import navHome2 from '../styles/navbtns/navHome2.png'
import navSearch from '../styles/navbtns/navSearch.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from "@mui/material/styles";
import {Link} from 'react-router-dom';

const StyledBottomNavigationAction= styled(BottomNavigationAction)(`
filter: grayscale(1);
color: rgba(0, 0, 0, 0.5);
&.Mui-selected {
  filter: grayscale(0);
  color: #E8AA42;
}
`);
export default function NavBar() {


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
      <Paper sx={{ position: 'fixed', bottom: 0, width: '100%'}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue)
            setValue(newValue);
          }}
        >
        
          {/* <BottomNavigationAction conponent={Link} to='/' */}
          

          <StyledLink to='/'>
          <BottomNavigationAction
            label="Home" 
            icon={<img src={navHome2} alt="navHome" width="50"></img>}/>
            
          </StyledLink>
      

      
          <BottomNavigationAction 
            component={Link}
            to='/songPage'
            label="Search" icon={<img src={navSearch} alt="navSearch" width="30"></img>} />


          <BottomNavigationAction 
            label="Favorites" 
            icon={<img src={navFav} 
            alt="navFav" 
            width="30"></img>} />


          <BottomNavigationAction 
            label="My" 
            icon={<AccountCircleIcon 
            color="secondary" 
            sx={{ fontSize: 30 }}/>} />



        </BottomNavigation>
      </Paper>
    </div>
  )
}
