import React, { useEffect } from "react";
import { connect } from "react-redux";
import SortingBar from "./SortingBar";
import { updateArray } from "../actions";
import styled from "styled-components";
import { ISwapAction, ISortTargetPayload } from "../constants/Itypes";
import ActionAlert from "./ControlComponents/ActionAlert";

interface IComponentProps {
  sortTarget: Array<ISortTargetPayload>;
  updateArray: (sortTarget: Array<ISortTargetPayload>) => void;
  nextAction: ISwapAction | null;
  speed: number;
  isSorting: boolean;
  isShuffle: boolean;
  isCheck: boolean;
}

interface IComponentState {
  sortTarget: Array<ISortTargetPayload>;
  nextactions: ISwapAction | null;
  speed: number;
  isSorting: boolean;
  isShuffle: boolean;
  isCheck: boolean;
}
const Wrapper = styled.div`
  width: 75vw;
  height: 100vh;
  background: var(--background);
  display: "grid";
`;

const Container = styled.div`
  width: 75vw;
  height: 80vh;
  background: var(--background);
  align-items: flex-end;
  display: flex;
`;
const AlertContainer = styled.div`
  height: 20vh;
  background: var(--background);
  z-index: 2;
`;

const AlertChild = styled.div`
  background: var(--background);
  font-family: "Anton", sans-serif;
  font-size: 30px;
  color: var(--title);
  padding-top: 30px;
`;

const SortingBoard: React.FC<IComponentProps> = ({
  sortTarget,
  updateArray,
  nextAction,
  speed,
  isSorting,
  isShuffle,
  isCheck,
}) => {
  // const classes = useStyles();
  useEffect(() => {
    //main animation loop
    if (nextAction !== null && nextAction !== undefined) {
      let newArray = [...sortTarget];
      // let performedAction = action.payload;
      if (nextAction.type === "comparison") {
        newArray[nextAction.first!].isCompared = true;
        newArray[nextAction.second!].isCompared = true;
        updateArray(newArray);
      } else if (nextAction.type === "swapColors") {
        newArray[nextAction.first!].isCompared = false;
        newArray[nextAction.second!].isCompared = false;
        newArray[nextAction.first!].isSwapped = true;
        newArray[nextAction.second!].isSwapped = true;
      } else if (nextAction.type === "swap") {
        let temp = newArray[nextAction.first!];
        newArray[nextAction.first!] = newArray[nextAction.second!];
        newArray[nextAction.second!] = temp;
      } else if (nextAction.type === "clean") {
        newArray.forEach((b) => {
          b.isCompared = false;
          b.isSwapped = false;
          b.isPivot = false;
        });
      } else if (nextAction.type === "set_pivot") {
        newArray[nextAction.pivot!].isPivot = true;
      } else if (nextAction.type === "sorted") {
        newArray[nextAction.index!].isDone = true;
      }
      updateArray(newArray);
    }
  }, [nextAction, updateArray]);
  return (
    <Wrapper>
      <AlertContainer>
        <ActionAlert
          delay={300}
          show={isSorting}
          children={<AlertChild>Sorting</AlertChild>}
        />
        <ActionAlert
          delay={300}
          show={isShuffle}
          children={<AlertChild>Shuffling</AlertChild>}
        />
        <ActionAlert
          delay={300}
          show={isCheck}
          children={<AlertChild>Check Sorted</AlertChild>}
        />
      </AlertContainer>

      <Container>
        {sortTarget.map((element, i) => (
          <SortingBar element={element} speed={speed} key={i} index={i} />
        ))}
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = (state: IComponentState) => ({
  sortTarget: state.sortTarget,
  nextAction: state.nextactions,
  speed: state.speed,
  isSorting: state.isSorting,
  isShuffle: state.isShuffle,
  isCheck: state.isCheck,
});

const mapDispatchToProps = (dispatch: any) => ({
  //update array elements
  updateArray: (sortTarget: Array<ISortTargetPayload>) =>
    dispatch(updateArray({ sortTarget })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortingBoard);
