export interface CargoItem {
  id: string;
  name: string;
  weight: number;
  profit: number;
  isSplittable: boolean;
}

export type Dataset = 'custom' | 'small' | 'large' | 'divisible_only' | 'indivisible_only';

export interface GreedyItemState extends CargoItem {
  ratio: number;
  fractionTaken: number;
}

export interface GreedyStep {
  activeLine: number;
  stepDescription: string;
  items: GreedyItemState[];
  currentItemIndex: number;
  remainingCapacity: number;
  currentProfit: number;
  currentWeight: number;
  isComplete: boolean;
}

export interface DPStep {
  activeLine: number;
  stepDescription: string;
  dpTable: number[][];
  currentRow: number;
  currentCol: number;
  currentItem: CargoItem | null;
  includeValue: number | null;
  excludeValue: number | null;
  chosenValue: number | null;
  isBacktracking: boolean;
  selectedItems: CargoItem[];
  rejectedItems: CargoItem[];
  isComplete: boolean;
}

