export interface ISortTargetPayload {
  value: number;
  isSwapped: boolean;
  isCompared: boolean;
  isDone: boolean;
  isPivot: boolean;
}

export interface ISwapAction {
  type?: string;
  first?: number;
  second?: number;
  value?: number;
  pivot?: number;
  index?: number;
}

export interface ICheckSorted {
  type: string;
  index: number;
}

export interface IChipData {
  key: number;
  label: string;
}
