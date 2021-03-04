import React from 'react';

import * as _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { Property } from '../Property/Property';
import ActionTypes from '../Context/actionTypes';
import { DispatchContext, StateContext } from '../Context/Context';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    height: '100vh',
  },
  appBar: {
    display: 'flex',
    justifyContent: 'around',
    padding: theme.spacing(2),
    height: '88px',
  },
  propertyContainer: {
    height: 'calc(100vh - 88px)',
    overflowY: 'auto',
  },
}));

const Sidebar = () => {
  const [searchKey, setSearchKey] = React.useState('');

  const classes = useStyles();
  const dispatch = React.useContext(DispatchContext);
  const { properties, filteredProperties } = React.useContext(StateContext);

  const onChangeSearchKey = React.useCallback((ev) => {
    setSearchKey(ev.target.value);
  }, []);

  const propertyRenderer = React.useMemo(() => {
    if (_.isEmpty(filteredProperties)) return null;

    return filteredProperties.map((p, index) => (
      <Property key={index.toString()} property={p} />
    ));
  }, [filteredProperties]);

  React.useEffect(() => {
    if (!properties) return;

    const temp = [...properties].filter(({ name }) =>
      name.toLowerCase().includes(searchKey.toLowerCase()),
    );
    dispatch({ type: ActionTypes.SET_FILTERED_PROPERTIES, payload: temp });
  }, [dispatch, properties, searchKey]);

  return (
    <Grid container spacing={1} className={classes.sidebar}>
      <Grid item xs={12}>
        <AppBar
          position="static"
          className={classes.appBar}
          color="transparent">
          <TextField
            id="property-search"
            placeholder="Search"
            type="search"
            variant="outlined"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            value={searchKey}
            onChange={onChangeSearchKey}
          />
        </AppBar>
      </Grid>
      <Grid item xs={12} className={classes.propertyContainer}>
        {propertyRenderer}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
