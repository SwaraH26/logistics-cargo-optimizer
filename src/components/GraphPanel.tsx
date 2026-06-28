import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const GraphPanel: React.FC<{ greedyResult?: any; dpResult?: any }> = ({ greedyResult, dpResult }) => {
  if (!greedyResult || !dpResult) {
    return <div className="text-muted" style={{ fontSize: '0.875rem' }}>Run Compare Both Algorithms to see graphs.</div>;
  }

  const getCapacityUsed = (name: string, result: any) => {
    if (name === 'Greedy') return result.steps[result.steps.length - 1].currentWeight;
    return result.steps[result.steps.length - 1].selectedItems.reduce((acc: number, item: any) => acc + item.weight, 0);
  };

  const timeData = [
    { name: 'Execution Time (ms)', Greedy: greedyResult.executionTimeMs, DP: dpResult.executionTimeMs }
  ];

  const profitData = [
    { name: 'Total Profit', Greedy: greedyResult.finalProfit, DP: dpResult.finalProfit }
  ];

  const capacityData = [
    { name: 'Capacity Utilized', Greedy: getCapacityUsed('Greedy', greedyResult), DP: getCapacityUsed('DP', dpResult) }
  ];

  const renderChart = (data: any[], title: string, fill1: string, fill2: string) => (
    <div style={{ width: '100%', height: 200, marginBottom: '1.5rem' }}>
      <h4 style={{ fontSize: '0.875rem', marginBottom: '0.5rem', textAlign: 'center' }}>{title}</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip 
            cursor={{ fill: 'rgba(0,0,0,0.04)' }} 
            contentStyle={{ 
              backgroundColor: '#2d3748', 
              color: '#fff', 
              borderRadius: '8px', 
              border: 'none', 
              fontSize: '12px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }} 
            itemStyle={{ fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="Greedy" fill={fill1} radius={[4, 4, 0, 0]} />
          <Bar dataKey="DP" fill={fill2} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex flex-col">
      {renderChart(timeData, 'Execution Time Comparison', 'var(--color-primary)', 'var(--color-secondary)')}
      {renderChart(profitData, 'Profit Comparison', 'var(--color-success)', 'var(--color-warning)')}
      {renderChart(capacityData, 'Capacity Utilization', 'var(--color-primary-dark)', 'var(--color-danger)')}
    </div>
  );
};
