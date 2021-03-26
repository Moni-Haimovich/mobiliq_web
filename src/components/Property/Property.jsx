import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { ImageSlider } from "../ImageSlider/ImageSlider";

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
}));

export const Property = ({ property }) => {
  const classes = useStyles();

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
        <ImageSlider images={property.images} />
      </AccordionDetails>
    </Accordion>
  );
};
