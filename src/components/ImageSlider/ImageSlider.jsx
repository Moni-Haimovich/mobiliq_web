import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "320px",
    width: "100%",
    overflowX: "auto",
    display: "flex",
    flexDirection: "row",
  },
  container: {
    position: "relative",
    margin: theme.spacing(1),
  },
  img: {
    height: "280px",
    width: "auto",
  },
  descContainer: {
    position: "absolute",
    bottom: "0px",
    margin: theme.spacing(1),
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0.15) 40%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.7) 100%);",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  desc: {
    fontSize: ".875rem",
    lineHeight: "1.25rem",
    letterSpacing: ".0178571429em",
    fontWeight: "500",
    color: "white",
  },
}));

export const ImageSlider = ({ images }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((img, index) => (
        <div
          key={`property-img-${index.toString()}`}
          className={classes.container}>
          <img
            alt="Property Image"
            src={img.url}
            title={img.description}
            className={classes.img}
          />
          {/* <div className={classes.descContainer}>
            <span className={classes.desc}>{img.description}</span>
          </div> */}
        </div>
      ))}
    </div>
  );
};
