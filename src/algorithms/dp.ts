import type { CargoItem, DPStep } from '../types';

export const dpCodeString = `1: function Knapsack01(items, capacity):
2:   Initialize DP[n+1][capacity+1] to 0
3:   for i from 1 to n:
4:     for w from 1 to capacity:
5:       if items[i-1].weight <= w:
6:         include = items[i-1].profit + DP[i-1][w - items[i-1].weight]
7:         exclude = DP[i-1][w]
8:         DP[i][w] = Max(include, exclude)
9:       else:
10:        DP[i][w] = DP[i-1][w]
11:  // Backtracking to find items
12:  res = DP[n][capacity], w = capacity
13:  for i from n down to 1:
14:    if res != DP[i-1][w]:
15:      Add items[i-1] to selection
16:      res -= items[i-1].profit
17:      w -= items[i-1].weight
18:  return selection, DP[n][capacity]`;

export const runDP01 = (items: CargoItem[], capacity: number) => {
  const t0 = performance.now();
  const steps: DPStep[] = [];
  const n = items.length;
  
  // Line 2
  const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

  steps.push({
    activeLine: 2,
    stepDescription: 'Initialize DP table with 0s.',
    dpTable: JSON.parse(JSON.stringify(dp)),
    currentRow: -1,
    currentCol: -1,
    currentItem: null,
    includeValue: null,
    excludeValue: null,
    chosenValue: null,
    isBacktracking: false,
    selectedItems: [],
    rejectedItems: [],
    isComplete: false
  });

  // Line 3
  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    
    // Line 4
    for (let w = 1; w <= capacity; w++) {
      let includeVal = 0;
      const excludeVal = dp[i - 1][w];
      let activeLine = 9; // default to else block

      // Line 5
      if (item.weight <= w) {
        // Line 6, 7, 8
        activeLine = 8;
        includeVal = item.profit + dp[i - 1][w - item.weight];
      }

      const chosen = Math.max(includeVal, excludeVal);
      dp[i][w] = chosen;

      steps.push({
        activeLine: activeLine,
        stepDescription: `Evaluating ${item.name} at capacity ${w}.`,
        dpTable: JSON.parse(JSON.stringify(dp)),
        currentRow: i,
        currentCol: w,
        currentItem: item,
        includeValue: item.weight <= w ? includeVal : null,
        excludeValue: excludeVal,
        chosenValue: chosen,
        isBacktracking: false,
        selectedItems: [],
        rejectedItems: [],
        isComplete: false
      });
    }
  }

  // Line 11, 12, 13
  let res = dp[n][capacity];
  let w = capacity;
  const selected: CargoItem[] = [];
  const rejected: CargoItem[] = [];

  for (let i = n; i > 0; i--) {
    const item = items[i - 1];
    steps.push({
      activeLine: 13,
      stepDescription: `Backtracking: checking if ${item.name} was included.`,
      dpTable: JSON.parse(JSON.stringify(dp)),
      currentRow: i,
      currentCol: w,
      currentItem: item,
      includeValue: null,
      excludeValue: null,
      chosenValue: dp[i][w],
      isBacktracking: true,
      selectedItems: [...selected],
      rejectedItems: [...rejected],
      isComplete: false
    });

    if (res === dp[i - 1][w]) {
      // Line 14 (not included)
      rejected.push(item);
    } else {
      // Line 15, 16, 17
      selected.push(item);
      res -= item.profit;
      w -= item.weight;
      
      steps.push({
        activeLine: 15,
        stepDescription: `${item.name} was included in optimal solution.`,
        dpTable: JSON.parse(JSON.stringify(dp)),
        currentRow: i,
        currentCol: w + item.weight, // show where we were
        currentItem: item,
        includeValue: null,
        excludeValue: null,
        chosenValue: dp[i][w + item.weight],
        isBacktracking: true,
        selectedItems: [...selected],
        rejectedItems: [...rejected],
        isComplete: false
      });
    }
  }

  // Line 18
  steps.push({
    activeLine: 18,
    stepDescription: 'Algorithm complete. Final items identified.',
    dpTable: JSON.parse(JSON.stringify(dp)),
    currentRow: -1,
    currentCol: -1,
    currentItem: null,
    includeValue: null,
    excludeValue: null,
    chosenValue: null,
    isBacktracking: true,
    selectedItems: selected,
    rejectedItems: rejected,
    isComplete: true
  });

  const t1 = performance.now();
  return { steps, executionTimeMs: t1 - t0, finalProfit: dp[n][capacity] };
};
