import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
const SortBar = styled.div`
  background: var(--bar);
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const CompareBar = styled.div`
  background: var(--compared);
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const SwappedBar = styled.div`
  background: var(--swapped);
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  margin: 5px;
  font-family: "Anton", sans-serif;
`;

const FinishSort = styled.div`
  background: var(--done);
  width: 30px;
  height: 30px;
  margin: 5px;
`;

const useStyles = makeStyles({
  divider: {
    margin: "10px",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    paddingTop: "10px",
    fontFamily: "'Anton', sans-serif",
  },
});

const ThemeLabel = () => {
  const classes = useStyles();
  return (
    <>
      <Divider className={classes.divider} />
      <Typography className={classes.text} variant="h5">
        Color Representation
      </Typography>
      <Container>
        <SortBar></SortBar>
        Normal
      </Container>
      <Container>
        <CompareBar></CompareBar>
        Comparing
      </Container>
      <Container>
        <SwappedBar></SwappedBar>
        Swapping
      </Container>
      <Container>
        <FinishSort></FinishSort>
        Sorted
      </Container>
    </>
  );
};

export default ThemeLabel;
