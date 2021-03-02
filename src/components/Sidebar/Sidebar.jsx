import React from 'react';

import * as _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { Property } from '../Property/Property';
import { useFindProperty } from '../../hooks/useFindProperty';
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

  const { data: useFindPropertyData, fetchProperty } = useFindProperty();

  const classes = useStyles();
  const dispatch = React.useContext(DispatchContext);
  const { properties } = React.useContext(StateContext);

  const onChangeSearchKey = React.useCallback((ev) => {
    setSearchKey(ev.target.value);
  }, []);

  const onSearchProperty = React.useCallback(async () => {
    if (!searchKey) return;
    fetchProperty(searchKey);
  }, [searchKey, fetchProperty]);

  const propertyRenderer = React.useMemo(() => {
    if (_.isEmpty(properties)) return null;

    return properties.map((p, index) => (
      <Property key={index.toString()} property={p} />
    ));
  }, [properties]);

  React.useEffect(() => {
    if (useFindPropertyData) {
      dispatch({
        type: ActionTypes.SET_PROPERTIES,
        payload: useFindPropertyData,
      });
    }
  }, [dispatch, useFindPropertyData]);

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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="search"
                    color="primary"
                    onClick={onSearchProperty}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
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
