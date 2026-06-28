import React from 'react';
import type { DPStep, CargoItem } from '../types';

export const DPVisualizer: React.FC<{ step: DPStep; capacity: number; items: CargoItem[]; finalOnly?: boolean }> = ({ step, capacity, items, finalOnly }) => {
  // Find max value in DP table to calculate heatmap colors
  let maxDP = 1; // avoid division by zero
  for (let i = 0; i < step.dpTable.length; i++) {
    for (let w = 0; w < step.dpTable[i].length; w++) {
      if (step.dpTable[i][w] > maxDP) {
        maxDP = step.dpTable[i][w];
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {!finalOnly && (
        <div 
          className="card" 
          style={{ 
            backgroundColor: '#a7c7e7', 
            color: '#333',
            fontWeight: 'bold',
            borderLeft: '4px solid #6c99c6'
          }}
        >
          {step.stepDescription}
        </div>
      )}

      <div className="flex gap-4">
        {/* Left Side: DP Heatmap Grid */}
        <div className="card flex-1 overflow-x-auto">
          <h3 className="mb-2">DP Table (Heatmap)</h3>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'center' }}>
            <thead>
              <tr>
                <th className="p-1">w →<br/>i ↓</th>
                {Array.from({ length: capacity + 1 }).map((_, w) => (
                  <th key={w} className="p-1 border-b-2 border-gray-300 w-8">{w}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step.dpTable.map((row, i) => (
                <tr key={i}>
                  <td className="p-1 font-bold border-r-2 border-gray-300 text-right pr-2">
                    {i === 0 ? '0' : items[i-1].name}
                  </td>
                  {row.map((val, w) => {
                    const isCurrent = i === step.currentRow && w === step.currentCol;
                    // Calculate heatmap color (white to deep blue based on value)
                    const intensity = val / maxDP;
                    const bgColor = isCurrent 
                      ? '#fbc02d' // bright yellow for current cell
                      : `rgba(108, 153, 198, ${intensity * 0.8})`; // heatmap

                    return (
                      <td 
                        key={w} 
                        style={{
                          width: '30px',
                          height: '30px',
                          border: '1px solid #e0e0e0',
                          backgroundColor: bgColor,
                          fontWeight: isCurrent ? 'bold' : 'normal',
                          color: intensity > 0.6 && !isCurrent ? '#fff' : '#333',
                          transition: 'all 0.3s'
                        }}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Formula Trace */}
        {!finalOnly && (
          <div className="card flex-1 flex flex-col gap-4">
            <h3>Formula Evaluation</h3>
            {!step.isBacktracking && step.currentRow > 0 && step.currentItem ? (
              <div className="flex flex-col gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded border border-gray-200" style={{ backgroundColor: '#f9f8f6' }}>
                  <strong>Item:</strong> {step.currentItem.name} (P: {step.currentItem.profit}, W: {step.currentItem.weight})
                  <br/>
                  <strong>Evaluating Capacity:</strong> {step.currentCol}
                </div>

                <div className="flex flex-col gap-2 p-4 rounded-lg border-2 border-dashed" style={{ borderColor: '#a7c7e7', backgroundColor: '#f0f4f8' }}>
                  <div style={{ color: step.chosenValue === step.excludeValue ? 'var(--color-primary-dark)' : 'inherit' }}>
                    <strong>Exclude:</strong> DP[i-1][w] = <strong>{step.excludeValue}</strong>
                  </div>
                  
                  {step.includeValue !== null ? (
                    <div style={{ color: step.chosenValue === step.includeValue ? 'var(--color-success)' : 'inherit' }}>
                      <strong>Include:</strong> Profit({step.currentItem.profit}) + DP[i-1][w-W]({step.includeValue - step.currentItem.profit}) = <strong>{step.includeValue}</strong>
                    </div>
                  ) : (
                    <div style={{ color: '#9e9e9e' }}>
                      <strong>Include:</strong> Item weight exceeds current capacity.
                    </div>
                  )}
                  
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ccc', fontSize: '1.125rem', fontWeight: 'bold' }}>
                    DP[{step.currentRow}][{step.currentCol}] = {step.chosenValue}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: '#9e9e9e', fontStyle: 'italic', padding: '1rem' }}>
                {step.isBacktracking 
                  ? "Backtracking phase: Tracing backwards from the final cell to determine selected items."
                  : "Waiting for item evaluation to begin..."}
              </div>
            )}

            {step.isBacktracking && (
              <div className="mt-4 p-4 rounded" style={{ backgroundColor: '#e8f5e9', border: '1px solid #c8e6c9' }}>
                <h4 style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>Selected Items So Far:</h4>
                <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                  {step.selectedItems.map((item, idx) => (
                    <li key={idx}>{item.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
