import React from 'react';

interface ResultMetrics {
  name: string;
  executionTimeMs: number;
  finalProfit: number;
  capacityUsed: number;
  itemsSelectedCount: number;
  timeComplexity: string;
  spaceComplexity: string;
}

export const PerformanceDashboard: React.FC<{ greedyResult?: any; dpResult?: any }> = ({ greedyResult, dpResult }) => {
  if (!greedyResult && !dpResult) {
    return <div className="text-muted" style={{ fontSize: '0.875rem' }}>Run an algorithm to see metrics.</div>;
  }

  const renderMetrics = (name: string, result: any, timeC: string, spaceC: string) => {
    if (!result) return null;
    
    // Calculate capacity used and items selected
    let capacityUsed = 0;
    let itemsCount = 0;
    
    if (name === 'Greedy') {
      const finalStep = result.steps[result.steps.length - 1];
      capacityUsed = finalStep.currentWeight;
      itemsCount = finalStep.items.filter((i: any) => i.fractionTaken > 0).length;
    } else {
      const finalStep = result.steps[result.steps.length - 1];
      itemsCount = finalStep.selectedItems.length;
      capacityUsed = finalStep.selectedItems.reduce((acc: number, item: any) => acc + item.weight, 0);
    }

    return (
      <div style={{ flex: 1, backgroundColor: 'var(--bg-page)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary-dark)' }}>{name}</h4>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between"><span>Exec Time:</span> <strong>{result.executionTimeMs.toFixed(4)} ms</strong></div>
          <div className="flex justify-between"><span>Profit:</span> <strong>{result.finalProfit.toFixed(2)}</strong></div>
          <div className="flex justify-between"><span>Capacity Used:</span> <strong>{capacityUsed.toFixed(2)}</strong></div>
          <div className="flex justify-between"><span>Items Selected:</span> <strong>{itemsCount}</strong></div>
          <div className="flex justify-between"><span>Time Complexity:</span> <strong>{timeC}</strong></div>
          <div className="flex justify-between"><span>Space Complexity:</span> <strong>{spaceC}</strong></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-4">
      {renderMetrics('Greedy', greedyResult, 'O(N log N)', 'O(N)')}
      {renderMetrics('0/1 Knapsack (DP)', dpResult, 'O(N * W)', 'O(N * W)')}
    </div>
  );
};
