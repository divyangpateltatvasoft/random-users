import React from 'react';
import './App.css';
import Users from './users/users';
import { AppBar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      {/* Application Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Random Users</Typography>
        </Toolbar>
      </AppBar>

      {/* Random Users List */}
      <Users></Users>
    </div>
  );
}

export default App;
