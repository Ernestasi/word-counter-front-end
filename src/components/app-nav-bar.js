import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppNavBar = () => {
  const displayDesktop = () => {
    return <Toolbar>{logo}</Toolbar>;
  };

  const logo = (
    <Typography variant="h6" component="h1">
      Word counter application
    </Typography>
  );

  return (
      <AppBar 
      position='inherit'>{displayDesktop()}</AppBar>
  );
};
export default AppNavBar;