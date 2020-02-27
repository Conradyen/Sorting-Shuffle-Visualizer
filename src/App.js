import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Visualizer from "./Visualizer/Visualizer";
import Button from "@material-ui/core/Button";
import BubbleSort from "./Visualizer/SortAlgo/BubbleSort";
import MergeSort from "./Visualizer/SortAlgo/MergeSort";
import QuickSort from "./Visualizer/SortAlgo/QuickSort";
import FYShuffle from "./Visualizer/ShuffleAlgo/FYShuffle";
import SpotifyShuffle from "./Visualizer/ShuffleAlgo/SpotifyShuffle";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import getrandomIntArray from "./randomIntArray";

const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = "black";

const SECONDARY_COLOR = "red";

const useStyles = makeStyles({
  control: {
    width: 400,
    padding: "20px",
    textAlign: "center",
    margin: "20px"
  },
  barDiv: {
    display: "flex",
    width: "60%"
  },
  button: {
    margin: "10px"
  },
  formControl: {
    width: "80%"
  }
});

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
        popperRef
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

function App() {
  const classes = useStyles();
  const [useLength, SetLength] = useState(10);
  const [useShuffle, SetShuffle] = useState(1);
  const [useSort, SetSort] = useState(1);
  var arrayforSort = getrandomIntArray();
  var animation;
  const onLenSliderChange = (e, value) => {
    SetLength(value);
    arrayforSort.slice(0, value);
  };

  const handleShuffleChange = event => {
    SetShuffle(event.target.value);
  };

  const handleSortChange = event => {
    SetSort(event.target.value);
  };

  const onSortButtonClick = e => {
    var animations;
    if (useSort === 1) {
      animations = BubbleSort(arrayforSort.slice(0, useLength));
    } else if (useSort === 2) {
      animations = MergeSort(arrayforSort.slice(0, useLength));
    } else {
      animations = QuickSort(arrayforSort.slice(0, useLength));
    }
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("makeStyles-bar-317");
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const onShuffleButtonClick = e => {
    var animations;
    if (useShuffle === 1) {
      animations = FYShuffle(arrayforSort.slice(0, useLength));
    } else if (useShuffle === 2) {
      animations = SpotifyShuffle(arrayforSort.slice(0, useLength));
    } else {
      animations = FYShuffle(arrayforSort.slice(0, useLength));
    }
    //const animations = FYShuffle(arrayforSort.slice(0, useLength));
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("makeStyles-bar-317");
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.control}>
              <Typography gutterBottom>Array Range</Typography>
              <Slider
                className="slider"
                min={10}
                max={130}
                step={1}
                ValueLabelComponent={ValueLabelComponent}
                value={useLength}
                onChange={onLenSliderChange}
              />

              <br />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Shuffle Algorithm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={useShuffle}
                  onChange={handleShuffleChange}
                >
                  <MenuItem value={1}>Fisher–Yates shuffle</MenuItem>
                  <MenuItem value={2}>Spotify Shuffle</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Sorting Algorithm
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={useSort}
                  onChange={handleSortChange}
                >
                  <MenuItem value={1}>Bubble Sort</MenuItem>
                  <MenuItem value={2}>Merge Sort</MenuItem>
                  <MenuItem value={3}>Quick Sort</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onSortButtonClick}
              >
                Sort
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onShuffleButtonClick}
              >
                Shuffle
              </Button>
            </Paper>
            <Grid item spacing={2}></Grid>
          </Grid>
          <Grid item xs={7}>
            <div className={classes.barDiv}>
              <Visualizer
                numBar={useLength}
                arr={arrayforSort.slice(0, useLength)}
                animation={animation}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
