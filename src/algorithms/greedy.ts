import type { CargoItem, GreedyItemState, GreedyStep } from '../types';

export const greedyCodeString = `1: function FractionalKnapsack(items, capacity):
2:   Calculate ratio (profit/weight) for all items
3:   Sort items by ratio in descending order
4:   for each item in sorted items:
5:     if capacity <= 0:
6:       break
7:     if item.weight <= capacity:
8:       Take whole item
9:       capacity -= item.weight
10:    else if item.isSplittable:
11:      Take fraction of item (capacity / item.weight)
12:      capacity = 0
13:    else:
14:      Skip item
15:  return selected items and profit`;

export const runGreedyFractional = (items: CargoItem[], capacity: number) => {
  const t0 = performance.now();
  const steps: GreedyStep[] = [];
  
  // Line 2
  const stateItems: GreedyItemState[] = items.map(item => ({
    ...item,
    ratio: item.profit / item.weight,
    fractionTaken: 0
  }));
  
  let currentCapacity = capacity;
  let currentProfit = 0;
  let currentWeight = 0;

  steps.push({
    activeLine: 2,
    stepDescription: 'Calculate Profit/Weight ratios for all items.',
    items: JSON.parse(JSON.stringify(stateItems)),
    currentItemIndex: -1,
    remainingCapacity: currentCapacity,
    currentProfit,
    currentWeight,
    isComplete: false
  });

  // Line 3
  stateItems.sort((a, b) => b.ratio - a.ratio);
  
  steps.push({
    activeLine: 3,
    stepDescription: 'Sort items by Profit/Weight ratio in descending order.',
    items: JSON.parse(JSON.stringify(stateItems)),
    currentItemIndex: -1,
    remainingCapacity: currentCapacity,
    currentProfit,
    currentWeight,
    isComplete: false
  });

  // Line 4
  for (let i = 0; i < stateItems.length; i++) {
    const item = stateItems[i];
    
    steps.push({
      activeLine: 4,
      stepDescription: `Evaluating ${item.name}. Weight: ${item.weight}, Profit: ${item.profit}.`,
      items: JSON.parse(JSON.stringify(stateItems)),
      currentItemIndex: i,
      remainingCapacity: currentCapacity,
      currentProfit,
      currentWeight,
      isComplete: false
    });

    if (currentCapacity <= 0) {
      steps.push({
        activeLine: 6,
        stepDescription: `Capacity is full. Breaking out of loop.`,
        items: JSON.parse(JSON.stringify(stateItems)),
        currentItemIndex: i,
        remainingCapacity: currentCapacity,
        currentProfit,
        currentWeight,
        isComplete: false
      });
      break;
    }

    if (item.weight <= currentCapacity) {
      // Line 8, 9
      item.fractionTaken = 1;
      currentCapacity -= item.weight;
      currentProfit += item.profit;
      currentWeight += item.weight;

      steps.push({
        activeLine: 8,
        stepDescription: `Took whole ${item.name}.`,
        items: JSON.parse(JSON.stringify(stateItems)),
        currentItemIndex: i,
        remainingCapacity: currentCapacity,
        currentProfit,
        currentWeight,
        isComplete: false
      });
    } else {
      if (item.isSplittable) {
        // Line 11, 12
        const fraction = currentCapacity / item.weight;
        item.fractionTaken = fraction;
        currentProfit += item.profit * fraction;
        currentWeight += currentCapacity;
        currentCapacity = 0;

        steps.push({
          activeLine: 11,
          stepDescription: `Capacity insufficient. Took ${(fraction * 100).toFixed(2)}% of ${item.name}.`,
          items: JSON.parse(JSON.stringify(stateItems)),
          currentItemIndex: i,
          remainingCapacity: currentCapacity,
          currentProfit,
          currentWeight,
          isComplete: false
        });
      } else {
        // Line 14
        steps.push({
          activeLine: 14,
          stepDescription: `${item.name} is indivisible and doesn't fit. Skipped.`,
          items: JSON.parse(JSON.stringify(stateItems)),
          currentItemIndex: i,
          remainingCapacity: currentCapacity,
          currentProfit,
          currentWeight,
          isComplete: false
        });
      }
    }
  }

  // Line 15
  steps.push({
    activeLine: 15,
    stepDescription: 'Algorithm complete. Final solution found.',
    items: JSON.parse(JSON.stringify(stateItems)),
    currentItemIndex: -1,
    remainingCapacity: currentCapacity,
    currentProfit,
    currentWeight,
    isComplete: true
  });

  const t1 = performance.now();
  return { steps, executionTimeMs: t1 - t0, finalProfit: currentProfit };
};
