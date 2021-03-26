import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  accordionSummary: {},
  title: {
    margin: "0",
    fontSize: "1.1em",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  accordionDetails: {
    flexDirection: "column",
  },
  address: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "auto",
    margin: theme.spacing(1),
  },
  imgDescriptionContainer: {
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
  imgDescription: {
    fontSize: ".875rem",
    lineHeight: "1.25rem",
    letterSpacing: ".0178571429em",
    fontWeight: "500",
    color: "white",
  },
  borderBottom: {
    borderBottom: "1px solid #dddddd",
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
            "bb-1": index !== property.images.length - 1,
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
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="property-content"
        id="property-header"
        className={classes.accordionSummary}>
        <h2 className={classes.title}> {property.name} </h2>
        <span className="f-12 ml-auto text-muted">{property.description}</span>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <div className={classes.address}>
          <span className="text-italic"> {property.address} </span>
        </div>
        {imgRenderer}
      </AccordionDetails>
    </Accordion>
  );
};
