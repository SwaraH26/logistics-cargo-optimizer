import React from 'react';
import type { GreedyStep } from '../types';

export const GreedyVisualizer: React.FC<{ step: GreedyStep; capacity: number }> = ({ step, capacity }) => {
  return (
    <div className="flex flex-col gap-4">
      <div 
        className="card" 
        style={{ 
          backgroundColor: '#ffb7b2', // secondary light red
          color: '#333',
          fontWeight: 'bold',
          borderLeft: '4px solid #ff6b6b'
        }}
      >
        {step.stepDescription}
      </div>

      <div className="flex gap-4">
        {/* Left side: The Knapsack */}
        <div className="card flex-1 flex flex-col items-center">
          <h3 className="mb-2">The Knapsack</h3>
          <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
            Capacity Used: <strong>{step.currentWeight.toFixed(2)} / {capacity}</strong>
          </div>
          
          {/* Visual Container */}
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '300px', 
              height: '300px', 
              border: '4px solid var(--color-primary-dark)',
              borderTop: 'none',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              position: 'relative',
              backgroundColor: '#f0f4f8',
              display: 'flex',
              flexDirection: 'column-reverse',
              overflow: 'hidden'
            }}
          >
            {/* Render items inside knapsack */}
            {step.items.filter(i => i.fractionTaken > 0).map((item, idx) => {
              const heightPercent = ((item.weight * item.fractionTaken) / capacity) * 100;
              return (
                <div 
                  key={idx}
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    backgroundColor: `hsl(${(idx * 137.5) % 360}, 70%, 70%)`,
                    borderTop: '2px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#333',
                    transition: 'height 0.3s'
                  }}
                >
                  {item.name} ({(item.fractionTaken * 100).toFixed(0)}%)
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side: Items Queue */}
        <div className="card flex-1">
          <h3 className="mb-4">Available Items</h3>
          <div className="flex flex-col gap-2">
            {step.items.map((item, idx) => {
              const isEvaluating = step.currentItemIndex === idx;
              const isTaken = item.fractionTaken > 0;
              const isSkipped = item.fractionTaken === 0 && step.currentItemIndex > idx;
              
              let bgColor = '#fff';
              if (isEvaluating) bgColor = '#fff9c4'; // yellow
              if (isTaken) bgColor = `hsl(${(idx * 137.5) % 360}, 70%, 90%)`;
              if (isSkipped) bgColor = '#f5f5f5'; // grey
              
              return (
                <div 
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: isEvaluating ? '2px solid #fbc02d' : '1px solid var(--border-color)',
                    backgroundColor: bgColor,
                    opacity: isSkipped ? 0.6 : 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s'
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      W: {item.weight} | P: {item.profit} | Ratio: {item.ratio.toFixed(2)}
                    </div>
                  </div>
                  {isTaken && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                      {(item.fractionTaken * 100).toFixed(0)}% TAKEN
                    </div>
                  )}
                  {isSkipped && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9e9e9e' }}>
                      SKIPPED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
