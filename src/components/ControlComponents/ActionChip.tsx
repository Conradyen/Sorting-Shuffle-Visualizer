import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import { IChipData } from "../../constants/Itypes";
import {
  updatePerformSort,
  updatePerformShuffle,
  updatePerformCheck,
} from "../../actions";
import LoopIcon from "@material-ui/icons/Loop";

interface IComponentState {
  performeSort: boolean;
  performeShuffle: boolean;
  performeCheck: boolean;
}

interface IComponentProps {
  updatePerformSort: (prop: boolean) => void;
  updatePerformShuffle: (prop: boolean) => void;
  updatePerformCheck: (prop: boolean) => void;
}

const Container = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 5px;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0;
`;

const chipStyle = {
  margin: "2px",
};

const ActionChip: React.FC<IComponentProps> = ({
  updatePerformSort,
  updatePerformShuffle,
  updatePerformCheck,
}) => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Shuffle" },
    { key: 1, label: "Sort" },
    { key: 2, label: "Check Sorted" },
  ]);

  const resetdata = [
    { key: 0, label: "Shuffle" },
    { key: 1, label: "Sort" },
    { key: 2, label: "Check Sorted" },
  ];

  const handleDelete = (chipToDelete: IChipData) => () => {
    if (chipToDelete.key === 0) {
      updatePerformSort(false);
    }
    if (chipToDelete.key === 1) {
      updatePerformShuffle(false);
    }
    if (chipToDelete.key === 2) {
      updatePerformCheck(false);
    }
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  const handleReset = () => {
    updatePerformSort(true);
    updatePerformShuffle(true);
    updatePerformCheck(true);
    setChipData(resetdata);
  };
  return (
    <Wrapper>
      <LoopIcon onClick={handleReset} />
      <Container>
        {chipData.map((data) => {
          let icon;
          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                color="primary"
                onDelete={handleDelete(data)}
                style={chipStyle}
              />
            </li>
          );
        })}
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = (state: IComponentState) => ({
  performeSort: state.performeSort,
  performeShuffle: state.performeShuffle,
  performeCheck: state.performeCheck,
});

const mapDispatchToProps = (dispatch: any) => ({
  updatePerformSort: (performeSort: boolean) =>
    dispatch(updatePerformSort({ performeSort })),
  updatePerformShuffle: (performeShuffle: boolean) =>
    dispatch(updatePerformShuffle({ performeShuffle })),
  updatePerformCheck: (performeCheck: boolean) =>
    dispatch(updatePerformCheck({ performeCheck })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionChip);
