import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { InputPanel } from './components/InputPanel';
import { PlaybackControls } from './components/PlaybackControls';
import { GreedyVisualizer } from './components/GreedyVisualizer';
import { DPVisualizer } from './components/DPVisualizer';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { GraphPanel } from './components/GraphPanel';
import { runGreedyFractional, greedyCodeString } from './algorithms/greedy';
import { runDP01, dpCodeString } from './algorithms/dp';
import { CodeTracker } from './components/CodeTracker';
import { useAppContext } from './store';

function App() {
  const { items, capacity } = useAppContext();
  
  const [activeMode, setActiveMode] = useState<'Greedy' | 'DP' | 'Compare' | null>(null);
  const [greedyResult, setGreedyResult] = useState<any>(null);
  const [dpResult, setDpResult] = useState<any>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDashboardMinimized, setIsDashboardMinimized] = useState(false);

  const handleRunGreedy = () => {
    if (items.length === 0) return alert('Please add items first.');
    const result = runGreedyFractional(items, capacity);
    setGreedyResult(result);
    setActiveMode('Greedy');
    setCurrentStepIndex(0);
  };

  const handleRunDP = () => {
    if (items.length === 0) return alert('Please add items first.');
    const result = runDP01(items, capacity);
    setDpResult(result);
    setActiveMode('DP');
    setCurrentStepIndex(0);
  };

  const handleCompare = () => {
    if (items.length === 0) return alert('Please add items first.');
    const resG = runGreedyFractional(items, capacity);
    const resDP = runDP01(items, capacity);
    setGreedyResult(resG);
    setDpResult(resDP);
    setActiveMode('Compare');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Input Module & Controls */}
      <aside className="sidebar">
        <div className="header">
          <h1>Cargo Optimizer</h1>
          <p>Educational Algorithm Platform</p>
        </div>
        
        <InputPanel />

        <div className="card">
          <h2>Main Buttons</h2>
          <div className="flex flex-col gap-2">
            <button className="btn btn-primary w-full" onClick={handleRunGreedy}>Run Greedy Algorithm</button>
            <button className="btn btn-primary w-full" onClick={handleRunDP}>Run 0/1 Knapsack</button>
            <button className="btn btn-secondary w-full" onClick={handleCompare}>Compare Both Algorithms</button>
          </div>
        </div>
      </aside>

      {/* Main Content - Visualizations & Performance */}
      <main className="main-content">
        <div className="card flex flex-col" style={{ flexGrow: 1, minHeight: activeMode === 'Compare' ? 'auto' : '500px', resize: 'vertical', overflow: 'auto', paddingBottom: '2rem' }}>
          <h2>Visualization Panel</h2>
          
          {!activeMode && (
             <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              Select an algorithm to run and visualize step-by-step tracing here.
            </p>
          )}

          {activeMode === 'Greedy' && greedyResult && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
              <div className="flex flex-col gap-4">
                <PlaybackControls 
                  totalSteps={greedyResult.steps.length} 
                  currentStepIndex={currentStepIndex} 
                  onStepChange={setCurrentStepIndex} 
                />
                <GreedyVisualizer step={greedyResult.steps[currentStepIndex]} capacity={capacity} />
              </div>
              <div style={{ height: '100%', minHeight: '450px' }}>
                <CodeTracker codeString={greedyCodeString} activeLine={greedyResult.steps[currentStepIndex].activeLine} />
              </div>
            </div>
          )}

          {activeMode === 'DP' && dpResult && (
            <div className="flex flex-col gap-6">
              <div className="card text-center py-6" style={{ backgroundColor: '#e8f5e9', border: '2px dashed #81c784' }}>
                <h3 className="text-xl font-bold mb-2 text-green-800">DP Execution Complete</h3>
                <p className="text-gray-700">Dynamic Programming algorithm (0/1 Knapsack) has evaluated the dataset.</p>
                <div className="mt-4 text-2xl font-bold text-green-700">
                  Final Optimal Profit: {dpResult.finalProfit.toFixed(2)}
                </div>
                <p className="mt-2 text-sm text-gray-500">Below is the final DP Table (Heatmap). See the Performance Dashboard below for full execution analysis.</p>
              </div>
              
              <DPVisualizer 
                step={dpResult.steps[dpResult.steps.length - 1]} 
                capacity={capacity} 
                items={items} 
                finalOnly={true} 
              />
            </div>
          )}

          {activeMode === 'Compare' && (
             <div className="text-muted" style={{ fontSize: '0.875rem' }}>
               Comparison mode executed instantly. See Performance Dashboard and Graphs below.
             </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-pointer" onClick={() => setIsDashboardMinimized(!isDashboardMinimized)} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ margin: 0, fontSize: '1rem' }}>Performance Dashboard & Graphs</h2>
            <button className="btn" style={{ padding: '0.25rem' }}>
              {isDashboardMinimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateRows: isDashboardMinimized ? '0fr' : '1fr', transition: 'grid-template-rows 0.3s ease-in-out' }}>
            <div style={{ overflow: 'hidden' }}>
              <div className="flex gap-6" style={{ flexWrap: 'wrap', paddingTop: isDashboardMinimized ? 0 : '0.5rem' }}>
                <div className="card w-full" style={{ flex: 1, minWidth: '300px' }}>
                  <PerformanceDashboard 
                    greedyResult={activeMode === 'Greedy' || activeMode === 'Compare' ? greedyResult : undefined}
                    dpResult={activeMode === 'DP' || activeMode === 'Compare' ? dpResult : undefined}
                  />
                </div>
                
                {activeMode === 'Compare' && (
                  <div className="card w-full" style={{ flex: 1, minWidth: '300px' }}>
                    <GraphPanel 
                      greedyResult={greedyResult} 
                      dpResult={dpResult} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

