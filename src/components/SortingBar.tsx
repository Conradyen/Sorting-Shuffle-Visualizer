import React from "react";
import styled from "styled-components";
import { ISortTargetPayload } from "../constants/Itypes";

const mapPropsToBGC = (
  isCompared: boolean,
  isSwapped: boolean,
  isDone: boolean
): string => {
  // console.log(isSwapped);
  if (isCompared) {
    return "var(--compared)";
  }
  if (isSwapped) {
    return "var(--swapped)";
  }
  if (isDone) {
    return "var(--done)";
  }
  return "var(--copyOtherSidebar)";
};

const mapPropsToTransition = (speed: number): string => {
  const minInterval = Math.min(300, speed);
  return `all ease-in-out ${minInterval}ms`;
};

interface IBarContainerProps {
  isSwapped: boolean;
  isCompared: boolean;
  isDone: boolean;
  speed: number;
  height: string;
}

interface IBarProps {
  element: ISortTargetPayload;
  speed: number;
  index: number;
}

const Bar = styled.div<IBarContainerProps>`
  height: ${(props) => props.height};
  flex: 1;
  background: ${(props) =>
    mapPropsToBGC(props.isCompared, props.isSwapped, props.isDone)};
  transition: ${(props) => mapPropsToTransition(props.speed)};
  color: var(--background);
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid var(--background);
`;

const SortingBar: React.FC<IBarProps> = ({ element, speed }) => {
  // const height = `${Math.floor((element.value / 700) * 100)}vh`;
  return (
    <Bar
      height={`${element.value}px`}
      isSwapped={element.isSwapped}
      isCompared={element.isCompared}
      isDone={element.isDone}
      speed={speed}
    ></Bar>
  );
};

export default SortingBar;
