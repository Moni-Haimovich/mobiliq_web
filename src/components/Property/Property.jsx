import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
  },
  descriptionContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  description: {},
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: 'auto',
    margin: theme.spacing(1),
  },
  imgDescriptionContainer: {
    position: 'absolute',
    bottom: '0px',
    margin: theme.spacing(1),
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0.15) 40%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.7) 100%);',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imgDescription: {
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    letterSpacing: '.0178571429em',
    fontWeight: '500',
    color: 'white',
  },
  borderBottom: {
    borderBottom: '1px solid #dddddd',
  },
}));

export const Property = ({ property }) => {
  const classes = useStyles();

  const imgRenderer = React.useMemo(
    () =>
      property.images.map((img, index) => (
        <div
          key={index.toString()}
          className={clsx({
            [classes.imgContainer]: true,
            [classes.borderBottom]: index !== property.images.length - 1,
          })}>
          <img
            alt="Property Image"
            src={img.url}
            title={img.description}
            className={classes.img}
          />
          <div className={classes.imgDescriptionContainer}>
            <span className={classes.imgDescription}>{img.description}</span>
          </div>
        </div>
      )),
    [classes, property],
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.titleContainer}>
          <h2 className={classes.title}> {property.name} </h2>
          <span className="f-12 text-muted"> {property.address} </span>
        </div>
        <div className={classes.descriptionContainer}>
          <span className={classes.description}> {property.description} </span>
        </div>
        {imgRenderer}
      </CardContent>
    </Card>
  );
};
