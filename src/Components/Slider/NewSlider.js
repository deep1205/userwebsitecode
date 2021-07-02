import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    flexGrow: 1,
    [theme.breakpoints.up(700)]: {
      maxWidth: 600,
      minWidth: 460,
    },
    [theme.breakpoints.up(900)]: {
      maxWidth: 600,
      minWidth: 400,
    },
    [theme.breakpoints.up(1000)]: {
      maxWidth: 600,
      minWidth: 400,
    },

    [theme.breakpoints.up(1100)]: {
      maxWidth: 500,
      minWidth: 360,
    },
    [theme.breakpoints.up(1125)]: {
      maxWidth: 500,
      minWidth: 360,
    },
    [theme.breakpoints.up(1150)]: {
      maxWidth: 500,
      minWidth: 360,
    },
    [theme.breakpoints.up(1200)]: {
      maxWidth: 550,
      minWidth: 370,
    },
    [theme.breakpoints.up(1300)]: {
      maxWidth: 550,
      minWidth: 400,
    },
    [theme.breakpoints.up(1400)]: {
      maxWidth: 600,
      minWidth: 450,
    },
    [theme.breakpoints.up(1500)]: {
      maxWidth: 650,
      minWidth: 600,
    },
    [theme.breakpoints.up(1600)]: {
      maxWidth: 750,
      minWidth: 600,
    },
    [theme.breakpoints.up(1700)]: {
      maxWidth: 750,
      minWidth: 600,
    },
    [theme.breakpoints.up(1800)]: {
      maxWidth: 750,
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,

    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "auto",
    marginTop: "380px",
    [theme.breakpoints.down(1100)]: {
      marginTop: 100,
      maxWidth: 550,
    },

    width: "100%",
  },
}));

function Slider({ tutorialSteps }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div id="wholeSlider" className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
      />
    </div>
  );
}

export default Slider;
