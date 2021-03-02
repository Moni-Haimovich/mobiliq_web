import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './components/Sidebar/Sidebar';
import PropertyMap from './components/PropertyMap/PropertyMap';
import { ContextProvider } from './components/Context/Context';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: theme.spacing(0),
  },
  sidebarContainer: {
    width: '408px',
  },
  mapContainer: {
    width: 'calc(100vw - 408px)',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ContextProvider>
      <Container className={classes.container} maxWidth={false}>
        <Grid item className={classes.sidebarContainer}>
          <Sidebar />
        </Grid>
        <Grid item className={classes.mapContainer}>
          <PropertyMap />
        </Grid>
      </Container>
    </ContextProvider>
  );
}

export default App;
