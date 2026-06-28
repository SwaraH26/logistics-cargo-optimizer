import React, { useState } from 'react';
import { useAppContext } from '../store';
import { Trash2, Plus } from 'lucide-react';

export const InputPanel = () => {
  const { capacity, setCapacity, items, deleteItem, addItem, loadDataset, resetInputs } = useAppContext();
  
  const [newItemName, setNewItemName] = useState('');
  const [newItemWeight, setNewItemWeight] = useState('');
  const [newItemProfit, setNewItemProfit] = useState('');
  const [newItemSplittable, setNewItemSplittable] = useState(true);

  const handleAddItem = () => {
    if (!newItemName || !newItemWeight || !newItemProfit) return;
    addItem({
      name: newItemName,
      weight: Number(newItemWeight),
      profit: Number(newItemProfit),
      isSplittable: newItemSplittable
    });
    setNewItemName('');
    setNewItemWeight('');
    setNewItemProfit('');
    setNewItemSplittable(true);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
        <h2>Input Panel</h2>
        <div className="flex gap-2">
          <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={resetInputs}>Reset</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label>Cargo Capacity</label>
          <input 
            type="number" 
            value={capacity} 
            onChange={(e) => setCapacity(Number(e.target.value))} 
            placeholder="Total capacity" 
            min="1"
          />
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Add New Item</h3>
          <div className="flex flex-col gap-2">
            <input type="text" placeholder="Item Name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
            <div className="flex gap-2">
              <input type="number" placeholder="Weight" value={newItemWeight} onChange={(e) => setNewItemWeight(e.target.value)} min="1" />
              <input type="number" placeholder="Profit" value={newItemProfit} onChange={(e) => setNewItemProfit(e.target.value)} min="1" />
            </div>
            <label className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={newItemSplittable} onChange={(e) => setNewItemSplittable(e.target.checked)} />
              Is Splittable (Divisible)
            </label>
            <button className="btn btn-primary w-full" onClick={handleAddItem}>
              <Plus size={16} /> Add Item
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Current Items ({items.length})</h3>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2" style={{ backgroundColor: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      W: {item.weight} | P: {item.profit} | {item.isSplittable ? 'Splittable' : 'Indivisible'}
                    </div>
                  </div>
                  <button className="btn-icon" onClick={() => deleteItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
