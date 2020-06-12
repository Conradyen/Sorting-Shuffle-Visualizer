import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ThemeSwitch from "./ThemeSwitch";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import ThemeLabel from "./ControlComponents/ThemeLabel";
import {
  setArrayLen,
  setShuffleAlgorithm,
  setSortAlgorithm,
  startShuffle,
  startSorting,
  setSpeed,
  doActions,
  resetAll,
  updateArray,
} from "../actions";
import ActionChip from "./ControlComponents/ActionChip";
const useStyles = makeStyles((theme) => ({
  control: {
    width: "23vw",
    display: "grid",
    padding: "10px",
    textAlign: "left",
    alignItems: "center",
    margin: "10px",
    justifyContent: "center",
  },
  slider: { width: "80%", padding: "10px", margin: "10px" },
  barDiv: {
    display: "flex",
    width: "60%",
  },
  button: {
    padding: "10px",
    margin: "10px",
  },
  formControl: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    margin: "10px",
  },
  radio: {
    alignItems: "center",
    margin: "3px",
    padding: "0px",
    fontFamily: "'Anton', sans-serif",
  },
  select: { width: "90%", margin: "10px" },
  text: {
    fontFamily: "'Anton', sans-serif",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

const Control = ({
  isActionReady,
  arrayLength,
  setArrayLen,
  sortAlgo,
  shuffleAlgo,
  setSpeed,
  speed,
  setSortAlgorithm,
  setShuffleAlgorithm,
  doActions,
  sortTarget,
  resetAll,
  updateArray,
}) => {
  const classes = useStyles();

  const handelLenChange = (e, value) => {
    setArrayLen(value);
  };
  const handleSpeedChange = (e, value) => {
    setSpeed(value);
  };
  const handleSortAlgoChange = (e, value) => {
    setSortAlgorithm(value.props.value);
  };
  const handleShuffleAlgoChange = (e, value) => {
    // console.log(value.props.value);
    setShuffleAlgorithm(value.props.value);
  };
  const handelStartSorting = (e) => {
    // startSorting(!doActions);
    if (!isActionReady) doActions(!isActionReady);
    else {
      let newArray = [...sortTarget];
      newArray.forEach((b) => {
        b.isCompared = false;
        b.isSwapped = false;
        b.isDone = false;
      });
      resetAll();
      updateArray({ sortTarget: newArray });
    }
  };

  return (
    <Paper className={classes.control}>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Sort and Shuffle Visualizer
      </Typography>
      <Typography className={classes.text}>
        Dark Mode <ThemeSwitch />
      </Typography>

      <Typography className={classes.text} id="discrete-slider" gutterBottom>
        Array Length
      </Typography>
      <Slider
        className={classes.slider}
        min={10}
        max={130}
        step={1}
        ValueLabelComponent={ValueLabelComponent}
        value={arrayLength}
        onChange={handelLenChange}
      />

      <FormControl id="shuffle_select" className={classes.formControl}>
        <InputLabel id="shuffle_select-label">Shuffle Algorithm</InputLabel>
        <Select
          className={classes.select}
          labelId="shuffle_select-select-label"
          id="shuffle_select"
          value={shuffleAlgo}
          onChange={handleShuffleAlgoChange}
        >
          <MenuItem value={1}>Fisher–Yates shuffle</MenuItem>
          <MenuItem value={2}>Sattolo shuffle</MenuItem>
          <MenuItem value={3}>Naive shuffle</MenuItem>
        </Select>
      </FormControl>

      <FormControl id="sort_select" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sorting Algorithm</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortAlgo}
          onChange={handleSortAlgoChange}
        >
          <MenuItem value={1}>Bubble Sort</MenuItem>
          <MenuItem value={2}>Merge Sort</MenuItem>
          <MenuItem value={3}>Quick Sort</MenuItem>
          <MenuItem value={4}>Insertion Sort</MenuItem>
          <MenuItem value={5}>Selection Sort</MenuItem>
          <MenuItem value={6}>Heap Sort</MenuItem>
        </Select>
      </FormControl>

      <RadioGroup
        className={classes.formControl}
        aria-label="speed"
        name="speed"
        value={speed}
        onChange={handleSpeedChange}
        row
      >
        <FormLabel className={classes.radioGroup} component="legend">
          Animation Speed
        </FormLabel>
        <FormControlLabel
          value="500"
          control={<Radio className={classes.radio} color="primary" />}
          label="slow"
        />
        <FormControlLabel
          value="100"
          control={<Radio className={classes.radio} color="primary" />}
          label="mid"
        />
        <FormControlLabel
          value="10"
          control={<Radio className={classes.radio} color="primary" />}
          label="fast"
        />
      </RadioGroup>
      <ActionChip />
      <Button
        id="sort_btn"
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handelStartSorting}
      >
        {isActionReady ? "Reset" : "Start"}
      </Button>
      <ThemeLabel />
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  isActionReady: state.isActionReady,
  sortTarget: state.sortTarget,
  sortAlgo: state.sortAlgo,
  shuffleAlgo: state.shuffleAlgo,
  arrayLength: state.arrayLength,
  speed: state.speed,
});

const mapDispatchToProps = (dispatch) => ({
  setArrayLen: (len) => dispatch(setArrayLen(len)),
  setSortAlgorithm: (algo) => dispatch(setSortAlgorithm(algo)),
  setShuffleAlgorithm: (algo) => dispatch(setShuffleAlgorithm(algo)),
  startSorting: (arr) => dispatch(startSorting(arr)),
  startShuffle: (arr) => dispatch(startShuffle(arr)),
  setSpeed: (speed) => dispatch(setSpeed(speed)),
  doActions: (arr) => dispatch(doActions(arr)),
  updateArray: (arr) => dispatch(updateArray(arr)),
  resetAll: () => dispatch(resetAll({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Control);
